import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_1, GREY_3, GREY_9 } from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
import { Helmet } from "react-helmet";
// import hunterProfile from "../images/hunterProfile.png";
// import qProfile from "../images/qProfile.png";
import { FONT } from "../styles/Font";
import "./about.css";

const { Content } = Layout;

class Team extends Component {
  render() {
    const { colorTheme, loggedInState, windowWidth } = this.props;

    let background = colorTheme.backgroundColor;
    let headerColor = colorTheme.text1Color;
    let paragraphColor = colorTheme.text3Color;
    if (loggedInState === "not_logged_in") {
      background = GREY_1;
      headerColor = GREY_9;
      paragraphColor = GREY_3;
    }

    let h2FontSize = "36px";
    let h4FontSize = "24px";
    let h4Padding = "60px 0px 60px 0px";
    let pFontSize = "20px";
    let pPadding = "60px 0px 60px 0px";
    let secondMatchCardPadding = "0px 0px 0px 0px";

    if (windowWidth < 768) {
      h2FontSize = "24px";
      h4FontSize = "18px";
      h4Padding = "30px 0px 30px 0px";
      pFontSize = "16px";
      pPadding = "30px 0px 30px 0px";
      secondMatchCardPadding = "15px 0px 0px 0px";
    }

    return (
      <Content
        style={{
          textAlign: "center",
          padding: "120px 0px 0px",
          background: background
        }}
      >
        <Helmet>
          <title>Team</title>
        </Helmet>
        <Row type="flex" justify="center" style={{ padding: pFontSize }}>
          <Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 22 }}>
            <h2
              style={{
                textAlign: "center",
                color: GREY_9,
                fontSize: h2FontSize,
                fontFamily: FONT,
                marginBottom: 0,
              }}
            >
              Team
            </h2>
          </Col>
        </Row>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.customHeader.windowWidth,
    colorTheme: state.colorTheme,
    loggedInState: state.auth.loggedInState
  };
}

export default connect(
  mapStateToProps,
  null
)(Team);
