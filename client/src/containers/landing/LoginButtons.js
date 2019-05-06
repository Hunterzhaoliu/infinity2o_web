import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_1, BLUE_7, RED_ORANGE_7 } from "../styles/ColorConstants";
import { Row, Col, Icon } from "antd";
import "./login-buttons.css";

class LoginButtons extends Component {
  render() {
    const { windowWidth } = this.props;

    document.documentElement.style.setProperty(`--GREY_1`, GREY_1);

    let largeGmailLoginText = "Gmail Login ";
    let largeLinkedInLoginText = "LinkedIn Login ";
    let smallLoginText = "";

    if (windowWidth < 768) {
      // less than medium screen, need to change where the infinity2o logo
      // is and adjust text size
      largeGmailLoginText = "";
      largeLinkedInLoginText = "";
      smallLoginText = " Login";
    }

    return (
      <Col>
        <Row type="flex" justify="start" align="middle">
          <Col>
            <a
              style={{
                borderColor: RED_ORANGE_7,
                background: RED_ORANGE_7
              }}
              className="login-anchor"
              href="/auth/google"
            >
              {largeGmailLoginText}
              <Icon style={{ fontSize: 18 }} type="google" />
              {smallLoginText}
            </a>
          </Col>
          <Col style={{ padding: "0px 0px 0px 20px" }}>
            <a
              style={{ borderColor: BLUE_7, background: BLUE_7 }}
              className="login-anchor"
              href="/auth/linkedIn"
            >
              {largeLinkedInLoginText}
              <Icon style={{ fontSize: 18 }} type="linkedin" />
              {smallLoginText}
            </a>
          </Col>
        </Row>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.customHeader.windowWidth
  };
}

export default connect(
  mapStateToProps,
  null
)(LoginButtons);
