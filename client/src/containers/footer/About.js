import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_1, GREY_3, GREY_9 } from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
import MatchCards from "../matches/MatchCards";
import { Helmet } from "react-helmet";
import "./about.css";

const { Content } = Layout;

class About extends Component {
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

    const q = {
      name: "Q Liu",
      age: 25,
      totalUserVotes: 62,
      interests: [
        "entrepreneurship",
        "nutrition",
        "robotics",
        "mechanical_engineering",
        "electrical_engineering"
      ],
      linkedInPublicProfileUrl: "https://www.linkedin.com/in/letterq/",
      githubPublicProfileUrl: "https://github.com/quinnliu",
      imageUrl:
        "https://lh5.googleusercontent.com/-J_P0Sk0phsE/AAAAAAAAAAI/AAAAAAAAACU/kM-9AVW-rl8/photo.j150"
    };

    const hunter = {
      name: "Hunter Liu",
      age: 18,
      totalUserVotes: 47,
      interests: [
        "artificial_intelligence",
        "computer_science",
        "design",
        "economics",
        "entrepreneurship"
      ],
      linkedInPublicProfileUrl: "https://www.linkedin.com/in/hunterzhaoliu/",
      githubPublicProfileUrl: "https://github.com/Hunter690",
      imageUrl:
        "https://lh4.googleusercontent.com/-_cJdeMMJK7c/AAAAAAAAAAI/AAAAAAAAAhA/7XZmb3NeW9g/photo.j150"
    };

    return (
      <Content
        style={{
          textAlign: "center",
          padding: "120px 0px 0px",
          background: background
        }}
      >
        <Helmet>
          <title>About</title>
        </Helmet>
        <Row type="flex" justify="center">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 20 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <h2
              className="about-h2"
              style={{ color: headerColor, fontSize: h2FontSize }}
            >
              About
            </h2>
          </Col>
        </Row>
        <Row style={{ padding: h4Padding }} type="flex" justify="center">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 20 }}
            md={{ span: 20 }}
            lg={{ span: 19 }}
            xl={{ span: 24 }}
          >
            <h4
              className="about-h4"
              style={{ color: headerColor, fontSize: h4FontSize }}
            >
              We took 20+ online courses alone and then 3 together before
              starting infinity2o.
            </h4>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 14 }}
            md={{ span: 10 }}
            lg={{ span: 9 }}
            xl={{ span: 7 }}
          >
            <MatchCards match={hunter} />
          </Col>
          <Col
            style={{ padding: secondMatchCardPadding }}
            xs={{ offset: 0, span: 20 }}
            sm={{ offset: 0, span: 14 }}
            md={{ offset: 1, span: 10 }}
            lg={{ offset: 1, span: 9 }}
            xl={{ offset: 1, span: 7 }}
          >
            <MatchCards match={q} />
          </Col>
        </Row>
        <Row style={{ padding: pPadding }} type="flex" justify="left">
          <Col
            xs={{ offset: 2, span: 20 }}
            sm={{ offset: 2, span: 20 }}
            md={{ offset: 2, span: 20 }}
            lg={{ offset: 3, span: 16 }}
            xl={{ offset: 5, span: 14 }}
          >
            <p
              className="about-p"
              style={{ color: paragraphColor, fontSize: pFontSize }}
            >
              &emsp; We believe online courses will be very important in future
              education. But until now, online courses have been indepedent
              places to learn reliant on broken responses rather than real
              discussion.
            </p>
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
)(About);
