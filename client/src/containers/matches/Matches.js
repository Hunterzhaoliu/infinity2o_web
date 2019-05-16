import React, { Component } from "react";
import { connect } from "react-redux";
import * as matchesActionCreators from "../../actions/matches/matches";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import { MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH } from "../../utils/constants";
import "./Matches.css";
import { Layout, Row, Col, Progress, Icon } from "antd";
import MatchCards from "./MatchCards";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Matches extends Component {
  componentDidMount() {
    // run once before first render()
    const { loggedInState } = this.props;
    if (loggedInState === "not_logged_in") {
      // push user to landing page
      this.props.history.push("/");
    } else {
      this.props.onMatches();
      this.props.fetchUserMatches(this.props.mongoDBUserId);
    }
  }

  componentWillReceiveProps(nextProps) {
    // basicMatchInfo contains the match Ids and whether they have been seen
    if (nextProps.basicMatchInfo !== this.props.basicMatchInfo) {
      this.props.checkIfMatchSeen(
        nextProps.basicMatchInfo[0],
        nextProps.mongoDBUserId
      );
    }
  }

  renderMatches() {
    const {
      colorTheme,
      matches,
      history,
      totalUserVotesAcrossAllSessions,
      runningAthenaForUser,
      windowWidth
    } = this.props;

    document.documentElement.style.setProperty(
      `--text1Color`,
      colorTheme.text1Color
    );
    document.documentElement.style.setProperty(
      `--text2Color`,
      colorTheme.text2Color
    );
    document.documentElement.style.setProperty(
      `--text6Color`,
      colorTheme.text6Color
    );
    document.documentElement.style.setProperty(
      `--text7Color`,
      colorTheme.text7Color
    );
    document.documentElement.style.setProperty(
      `--text8Color`,
      colorTheme.text8Color
    );
    document.documentElement.style.setProperty(
      `--keyText7Color`,
      colorTheme.keyText7Color
    );

    const hasMatches = matches.current1DisplayedMatches.length > 0;
    if (hasMatches) {
      const match = matches.current1DisplayedMatches[0];
      return (
        <Col
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 14 }}
          lg={{ span: 11 }}
          xl={{ span: 7 }}
        >
          <MatchCards match={match} history={history} />
        </Col>
      );
    } else if (runningAthenaForUser) {
      let h4FontSize = "24px";
      if (windowWidth < 768) {
        h4FontSize = "18px";
      }
      return (
        <Col
          xs={{ span: 17 }}
          sm={{ span: 15 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >
          <h4
            style={{
              color: colorTheme.text2Color,
              fontFamily: "Overpass",
              fontSize: h4FontSize,
              lineHeight: 1,
              marginBottom: 0,
              display: "inline-block"
            }}
          >
            We will have matches for you in a moment
          </h4>
          <Icon
            style={{
              padding: "0px 0px 0px 10px",
              fontSize: "24px",
              color: colorTheme.text2Color
            }}
            type="loading"
          />
        </Col>
      );
    } else if (
      totalUserVotesAcrossAllSessions < MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH
    ) {
      // display progress bar showing user needs to vote X more times
      // before we run minerva for them
      const votesToGo =
        MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH - totalUserVotesAcrossAllSessions;
      const percentVotes = (100 / 8) * totalUserVotesAcrossAllSessions;

      let h4FontSize = "24px";
      let h6FontSize = "20px";
      let h4Padding = "30px 0px 60px";
      let progressPadding = "30px 0px 0px";
      if (windowWidth < 768) {
        h4FontSize = "18px";
        h6FontSize = "16px";
        h4Padding = "0px 0px 30px";
        progressPadding = "15px 0px 0px";
      }

      return (
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
        >
          <Row type="flex" justify="center">
            <Col
              xs={{ span: 17 }}
              sm={{ span: 15 }}
              md={{ span: 18 }}
              lg={{ span: 14 }}
              xl={{ span: 24 }}
            >
              <h4
                style={{
                  padding: h4Padding,
                  color: colorTheme.text3Color,
                  fontFamily: "Overpass",
                  fontSize: h4FontSize,
                  lineHeight: 1,
                  marginBottom: 0
                }}
              >
                Recieve your first 2 matches by voting on 8 questions in Sorting
                Hat
              </h4>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <h6
                style={{
                  color: colorTheme.text4Color,
                  fontFamily: "Overpass",
                  fontSize: h6FontSize,
                  lineHeight: 1,
                  marginBottom: 0
                }}
              >
                You have {votesToGo} to go!
              </h6>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col
              xs={{ span: 18 }}
              sm={{ span: 16 }}
              md={{ span: 16 }}
              lg={{ span: 12 }}
              xl={{ span: 14 }}
            >
              <Progress
                style={{ padding: progressPadding }}
                percent={percentVotes}
                showInfo={false}
                status="active"
              />
            </Col>
          </Row>
        </Col>
      );
    } else {
      let h4FontSize = "24px";
      let h4Padding = "30px 0px 0px 0px";
      if (windowWidth < 768) {
        h4FontSize = "18px";
        h4Padding = "0px";
      }
      return (
        <Col
          xs={{ span: 17 }}
          sm={{ span: 15 }}
          md={{ span: 18 }}
          lg={{ span: 14 }}
          xl={{ span: 24 }}
        >
          <h4
            style={{
              padding: h4Padding,
              color: colorTheme.text3Color,
              fontFamily: "Overpass",
              fontSize: h4FontSize,
              lineHeight: 1,
              marginBottom: 0
            }}
          >
            You're out of matches for today. Vote on questions in Sorting Hat to
            get closer matches.
          </h4>
        </Col>
      );
    }
  }

  render() {
    const { colorTheme, windowWidth } = this.props;

    let h2FontSize = "32px";
    if (windowWidth < 768) {
      h2FontSize = "22px";
    }

    return (
      <Content
        style={{
          padding: "120px 0px 0px",
          background: colorTheme.backgroundColor,
          textAlign: "center"
        }}
      >
        <Helmet>
          <title>Matches</title>
        </Helmet>
        <Row type="flex" justify="center">
          <Col
            xs={{ span: 18 }}
            sm={{ span: 20 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <h2
              style={{
                color: colorTheme.text2Color,
                fontFamily: "Overpass",
                fontSize: h2FontSize,
                lineHeight: 1,
                marginBottom: 0
              }}
            >
              Best 2 Matches. Every Single Day. At 9 AM.
            </h2>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{ padding: "30px 0px 0px 0px" }}
        >
          {this.renderMatches()}
        </Row>
      </Content>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    loggedInState: state.auth.loggedInState,
    colorTheme: state.colorTheme,
    matches: state.matches,
    totalUserVotesAcrossAllSessions:
      state.matches.totalUserVotesAcrossAllSessions,
    runningAthenaForUser: state.matches.runningAthenaForUser,
    mongoDBUserId: state.auth.mongoDBUserId,
    basicMatchInfo: state.matches.basicMatchInfo,
    windowWidth: state.customHeader.windowWidth
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const matchesDispatchers = bindActionCreators(
    matchesActionCreators,
    dispatch
  );
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );

  return {
    onMatches: () => {
      colorThemeDispatchers.onMatches();
    },
    fetchUserMatches: mongoDBUserId => {
      matchesDispatchers.fetchUserMatches(mongoDBUserId);
    },
    checkIfMatchSeen: (matchNeededToBeChecked, mongoDBUserId) => {
      matchesDispatchers.checkIfMatchSeen(
        matchNeededToBeChecked,
        mongoDBUserId
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);
