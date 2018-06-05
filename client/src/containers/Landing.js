import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActions from "../actions/colorTheme";
import { bindActionCreators } from "redux";
import Testimonials from "./Testimonials";
import { Layout, Button, Row, Col, Icon } from "antd";
const { Content } = Layout;

class Landing extends Component {
  componentWillMount() {
    // run once before first render()

    this.props.onSignedInLanding();
  }

  renderTestimonials() {
    return (
      <div>
        <Row
          style={{
            padding: "2px 0px 0px" // top left&right bottom
          }}
          type="flex"
          justify="center"
        >
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 18 }}
            lg={{ span: 12 }}
            xl={{ span: 6 }}
          >
            <Testimonials />
          </Col>
        </Row>
      </div>
    );
  }

  renderMarketingInfo() {
    const { colorTheme } = this.props;
    const why_part_0 =
      "Meet interesting people with similar core beliefs to take online courses with.";
    const why_part_1 =
      "Students come to Infinity2o to vote, match, & learn from Coursera, edX, Udemy, & Udacity together.";

    return (
      <div>
        <Row type="flex" justify="center">
          <Col>
            <h1
              key="0"
              style={{
                textAlign: "center",
                color: colorTheme.text2Color
              }}
            >
              {why_part_0}
            </h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <h2
              key="0"
              style={{
                textAlign: "center",
                color: colorTheme.text3Color
              }}
            >
              {why_part_1}
            </h2>
          </Col>
        </Row>
        {this.renderTestimonials()}
      </div>
    );
  }

  renderLogin() {
    const { colorTheme, auth } = this.props;

    const why_part_2 = "Join Earth's largest community of online learners.";
    switch (auth.loggedInState) {
      case "not_logged_in":
        return (
          <div>
            <Row
              style={{
                padding: "3px 0px 0px" // top left&right bottom
              }}
              type="flex"
              justify="center"
            >
              <Col
                style={{
                  padding: "40px 0px 0px" // top left&right bottom
                }}
              >
                <h2
                  key="0"
                  style={{
                    textAlign: "center",
                    color: colorTheme.text3Color
                  }}
                >
                  {why_part_2}
                </h2>
              </Col>
            </Row>
            <Row
              style={{
                padding: "1px 0px 0px" // top left&right bottom
              }}
              type="flex"
              justify="space-around"
            >
              <Col
                xs={{ span: 0 }}
                sm={{ span: 3, offset: 0 }}
                md={{ span: 5, offset: 0 }}
                lg={{ span: 7, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
              />
              <Col
                xs={{ span: 12 }}
                sm={{ span: 9, offset: 0 }}
                md={{ span: 7, offset: 0 }}
                lg={{ span: 5, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
              >
                <Button
                  size="large"
                  key="-1"
                  style={{
                    borderColor: colorTheme.key,
                    background: colorTheme.key,
                    color: colorTheme.text1Color
                  }}
                >
                  <a href="/auth/google">
                    Google Login <Icon style={{ fontSize: 18 }} type="google" />
                  </a>
                </Button>
              </Col>
              <Col
                xs={{ span: 13 }}
                sm={{ span: 9, offset: 0 }}
                md={{ span: 7, offset: 0 }}
                lg={{ span: 4, offset: 0 }}
                xl={{ span: 3, offset: 0 }}
              >
                <Button
                  size="large"
                  key="0"
                  style={{
                    borderColor: colorTheme.keyCompliment1,
                    background: colorTheme.keyCompliment1,
                    color: colorTheme.text1Color
                  }}
                >
                  <a href="/auth/linkedIn">
                    LinkedIn Login{" "}
                    <Icon style={{ fontSize: 18 }} type="linkedin" />
                  </a>
                </Button>
              </Col>
              <Col
                xs={{ span: 0 }}
                sm={{ span: 3, offset: 0 }}
                md={{ span: 5, offset: 0 }}
                lg={{ span: 7, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
              />
            </Row>
          </div>
        );
      default:
        return;
    }
  }

  render() {
    //console.log('this.props inside Landing', this.props);
    const { colorTheme } = this.props;
    return (
      <Content
        style={{
          padding: "60px 50px 50px", // top left&right bottom
          background: colorTheme.backgroundColor
        }}
      >
        {this.renderMarketingInfo()}
        {this.renderLogin()}
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
    auth: state.auth
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const customHeaderDispatchers = bindActionCreators(
    colorThemeActions,
    dispatch
  );

  return {
    onPressRandomColorTheme: () => {
      customHeaderDispatchers.generateRandomColorTheme();
    },
    onSignedInLanding: () => {
      customHeaderDispatchers.onSignedInLanding();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
