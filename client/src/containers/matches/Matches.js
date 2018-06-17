import React, { Component } from "react";
import { connect } from "react-redux";
import * as matchesActionCreators from "../../actions/matches/matches";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import { MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH } from "../../utils/constants";
import "./Matches.css";
import { Layout, Row, Col, Progress, Icon } from "antd";
import MatchCards from "./MatchCards";
const { Content } = Layout;

class Matches extends Component {
  componentWillMount() {
    // run once before first render()
    this.props.onMatches();
    this.props.fetchUserMatches(this.props.mongoDBUserId);
  }

  componentWillReceiveProps(nextProps) {
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
      runningAthenaForUser
    } = this.props;

    document.documentElement.style.setProperty(
      `--keyText7Color`,
      colorTheme.keyText7Color
    );
    document.documentElement.style.setProperty(
      `--text6Color`,
      colorTheme.text6Color
    );
    document.documentElement.style.setProperty(
      `--text1Color`,
      colorTheme.text1Color
    );
    document.documentElement.style.setProperty(
      `--text2Color`,
      colorTheme.text2Color
    );
    document.documentElement.style.setProperty(
      `--text7Color`,
      colorTheme.text7Color
    );
    document.documentElement.style.setProperty(
      `--text8Color`,
      colorTheme.text8Color
    );

    const hasMatches = matches.current1DisplayedMatches.length > 0;
    if (hasMatches) {
      const match = matches.current1DisplayedMatches[0];
      return (
        <Col key={match.name}>
          <MatchCards match={match} history={history} />
        </Col>
      );
    } else if (runningAthenaForUser) {
      return (
        <Col>
          <h2
            style={{
              color: colorTheme.text2Color
            }}
          >
            We will have matches for you in a moment <Icon type="loading" />
          </h2>
        </Col>
      );
    } else if (
      totalUserVotesAcrossAllSessions < MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH
    ) {
      // display progress bar showing user needs to vote X more times
      // before we run minerva for them
      const votesToGo =
        MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH - totalUserVotesAcrossAllSessions;
      const percentVotes = 100 / 8 * totalUserVotesAcrossAllSessions;
      return (
        <Col
          sm={{ span: 24 }}
          md={{ span: 22 }}
          lg={{ span: 18 }}
          xl={{ span: 14 }}
        >
          <h2
            style={{
              color: colorTheme.text3Color
            }}
          >
            Recieve your first 2 matches by voting on 8 questions in Sorting Hat
          </h2>
          <h3
            style={{
              color: colorTheme.text4Color
            }}
          >
            You have {votesToGo} to go!
          </h3>
          <Progress percent={percentVotes} showInfo={false} status="active" />
        </Col>
      );
    } else {
      return (
        <Col
          sm={{ span: 24 }}
          md={{ span: 22 }}
          lg={{ span: 18 }}
          xl={{ span: 14 }}
        >
          <h2
            style={{
              color: colorTheme.text3Color
            }}
          >
            You're out of matches for today. Vote on questions in Sorting Hat to
            get better matches.
          </h2>
          <h3
            style={{
              color: colorTheme.text4Color
            }}
          >
            Every day at 9 AM CST, the Sorting Hat generates the 2 best study
            partners for you.
          </h3>
        </Col>
      );
    }
  }

  render() {
    const { colorTheme } = this.props;
    return (
      <Content
        style={{
          textAlign: "center",
          padding: "75px 50px 0px", // top left&right bottom
          background: colorTheme.backgroundColor
        }}
      >
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ padding: "20px 0px 0px 0px" }}
        >
          <Col
            sm={{ span: 0 }}
            md={{ span: 1 }}
            lg={{ span: 3 }}
            xl={{ span: 5 }}
          />
          <Col
            sm={{ span: 24 }}
            md={{ span: 22 }}
            lg={{ span: 18 }}
            xl={{ span: 14 }}
          >
            <h2
              style={{
                color: colorTheme.text2Color
              }}
            >
              Sorting Hat finds your 2 best matches everyday at 9 AM CST
            </h2>
          </Col>
          <Col
            sm={{ span: 0 }}
            md={{ span: 1 }}
            lg={{ span: 3 }}
            xl={{ span: 5 }}
          />
        </Row>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ padding: "20px 0px 0px 0px" }}
        >
          <Col
            sm={{ span: 0 }}
            md={{ span: 1 }}
            lg={{ span: 3 }}
            xl={{ span: 5 }}
          />
          {this.renderMatches()}
          <Col
            sm={{ span: 0 }}
            md={{ span: 1 }}
            lg={{ span: 3 }}
            xl={{ span: 5 }}
          />
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
    colorTheme: state.colorTheme,
    matches: state.matches,
    totalUserVotesAcrossAllSessions:
      state.matches.totalUserVotesAcrossAllSessions,
    runningAthenaForUser: state.matches.runningAthenaForUser,
    mongoDBUserId: state.auth.mongoDBUserId,
    basicMatchInfo: state.customHeader.basicMatchInfo
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

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
