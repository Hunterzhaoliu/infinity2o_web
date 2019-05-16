import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import VoteEdit from "./VoteEdit";
import { Layout, Row, Col } from "antd";
import ProfileCard from "./ProfileCard";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Profile extends Component {
  componentDidMount() {
    this.props.onProfile();
  }

  renderQuestions() {
    const { colorTheme, profile, windowWidth } = this.props;
    if (profile.asks != null) {
      // user has asked a question in sorting hat

      let pPadding = "12px 0px 22px 0px";
      if (windowWidth < 768) {
        pPadding = "0px 0px 15px 0px";
      }

      const newest8Questions = profile.asks.questions.slice(-8).reverse();
      return _.map(newest8Questions, (question, key) => {
        return (
          <Row key={key}>
            <Col>
              <p
                style={{
                  color: colorTheme.text3Color,
                  fontFamily: "Overpass",
                  lineHeight: 1,
                  marginBottom: 0,
                  fontSize: "16px",
                  padding: pPadding
                }}
              >
                {question.question}
              </p>
            </Col>
          </Row>
        );
      });
    }
  }

  render() {
    const { colorTheme, profile, windowWidth } = this.props;

    let h2FontSize = 32;
    let h4FontSize = 20;
    let questionsRowPadding = "0px 0px 5px 0px";

    if (windowWidth < 768) {
      h2FontSize = 26;
      h4FontSize = 16;
      questionsRowPadding = "60px 0px 5px 0px";
    }

    return (
      <Content
        style={{
          padding: "120px 0px 0px", // top right bottom left
          background: colorTheme.backgroundColor
        }}
      >
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Row type="flex" justify="center" align="middle">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 20 }}
            md={{ span: 20 }}
            lg={{ span: 20 }}
            xl={{ span: 20 }}
          >
            <ProfileCard />
            <Row style={{ padding: "60px 0px 0px 0px" }}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 11 }}
                lg={{ span: 12 }}
                xl={{ span: 12 }}
              >
                <Row
                  style={{ padding: "0px 0px 5px 0px" }}
                  type="flex"
                  justify="left"
                  align="bottom"
                >
                  <Col>
                    <h2
                      style={{
                        color: colorTheme.keyText6Color,
                        fontFamily: "Overpass",
                        lineHeight: 1,
                        marginBottom: 0,
                        fontSize: h2FontSize
                      }}
                    >
                      Votes
                    </h2>
                  </Col>
                  <Col>
                    <h4
                      style={{
                        padding: "0px 0px 0px 10px",
                        color: colorTheme.text6Color,
                        fontFamily: "Overpass",
                        lineHeight: 1,
                        marginBottom: 0,
                        fontSize: h4FontSize
                      }}
                    >
                      {"(" + String(profile.asks.totalUserVotes) + ")"}
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 22 }}
                    xl={{ span: 22 }}
                  >
                    <hr
                      style={{
                        backgroundColor: colorTheme.keyText7Color,
                        height: 2,
                        border: 0,
                        margin: "0px 0px 30px 0px"
                      }}
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="start">
                  <Col>
                    <VoteEdit />
                  </Col>
                </Row>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ offset: 1, span: 11 }}
                lg={{ offset: 0, span: 11 }}
                xl={{ span: 12 }}
              >
                <Row
                  style={{ padding: questionsRowPadding }}
                  type="flex"
                  justify="left"
                  align="bottom"
                >
                  <h2
                    style={{
                      color: colorTheme.keyText6Color,
                      fontFamily: "Overpass",
                      lineHeight: 1,
                      marginBottom: 0,
                      fontSize: h2FontSize
                    }}
                  >
                    Questions
                  </h2>
                  <h4
                    style={{
                      padding: "0px 0px 0px 10px",
                      color: colorTheme.text6Color,
                      fontFamily: "Overpass",
                      lineHeight: 1,
                      marginBottom: 0,
                      fontSize: h4FontSize
                    }}
                  >
                    {"(" + String(profile.asks.questions.length) + ")"}
                  </h4>
                </Row>
                <Row>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 22 }}
                    xl={{ span: 22 }}
                  >
                    <hr
                      style={{
                        backgroundColor: colorTheme.keyText7Color,
                        height: 2,
                        border: 0,
                        margin: "0px 0px 30px 0px"
                      }}
                    />
                  </Col>
                </Row>
                {this.renderQuestions()}
              </Col>
            </Row>
          </Col>
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
    profile: state.profile,
    windowWidth: state.customHeader.windowWidth
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );
  return {
    onProfile: () => {
      colorThemeDispatchers.onProfile();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
