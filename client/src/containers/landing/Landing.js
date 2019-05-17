import React, { Component } from "react";
import { connect } from "react-redux";
import * as landingActions from "../../actions/landing";
import { bindActionCreators } from "redux";
import { GREY_9, GREY_1 } from "../styles/ColorConstants";
import LoginButtons from "./LoginButtons";
import InputVote from "../sorting_hat/InputVote";
import Marketing from "./Marketing";
import Slider from "react-slick";
import { Layout, Row, Col } from "antd";
import { Helmet } from "react-helmet";
import firstLandingMatchExample from "../images/firstLandingMatchExample.png";
import secondLandingMatchExample from "../images/secondLandingMatchExample.png";
import thirdLandingMatchExample from "../images/thirdLandingMatchExample.png";

const { Content } = Layout;

class Landing extends Component {
  componentDidMount() {
    this.props.fetchLandingPageSortingHatAsks();
  }

  renderLandingAsks() {
    const { windowWidth } = this.props;
    const how_part_0 =
      "Let us find you the best partner based on what you're looking for.";

    let h2Padding = "120px 0px 0px";
    let h2FontSize = 32;
    let h2LineHeight = 1;
    let finalRowPadding = "60px 0px 90px 0px";

    if (windowWidth < 768) {
      h2Padding = "60px 0px 0px";
      h2FontSize = 22;
      finalRowPadding = "30px 0px 30px 0px";
      h2LineHeight = 1.3;
    }

    return (
      <div>
        <Row type="flex" justify="center" style={{ padding: h2Padding }}>
          <Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 22 }}>
            <h2
              style={{
                textAlign: "center",
                color: GREY_9,
                fontSize: h2FontSize,
                fontFamily: "Overpass",
                fontWeight: "bold",
                marginBottom: 0,
                lineHeight: h2LineHeight
              }}
            >
              {how_part_0}
            </h2>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{
            padding: finalRowPadding
          }}
        >
          <Col
            xs={{ span: 19 }}
            sm={{ span: 16 }}
            md={{ span: 20 }}
            lg={{ span: 18 }}
            xl={{ span: 15 }}
          >
            <InputVote />
          </Col>
        </Row>
      </div>
    );
  }

  renderMatch() {
    const { windowWidth } = this.props;

    let h2Padding = "120px 0px 0px";
    let h2FontSize = 32;
    let h2LineHeight = 1;
    let pictureRowPadding = "60px 0px 120px";

    if (windowWidth < 768) {
      h2Padding = "60px 0px 0px";
      h2FontSize = 22;
      h2LineHeight = 1.3;
      pictureRowPadding = "30px 0px 60px";
    }

    const settings = {
      dots: false,
      adaptiveHeight: true,
      infinite: true,
      autoplay: true,
      pauseOnHover: true,
      speed: 500, // transition speed
      autoplaySpeed: 6000, // delay between each auto scroll (in milliseconds)
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      pauseOnDotsHover: false,
      pauseOnFocus: true
    };

    return (
      <div>
        <Row type="flex" justify="center">
          <Col xs={{ span: 21 }} sm={{ span: 24 }}>
            <h2
              style={{
                textAlign: "center",
                color: GREY_1,
                fontSize: h2FontSize,
                fontFamily: "Overpass",
                fontWeight: "bold",
                padding: h2Padding,
                marginBottom: 0,
                lineHeight: h2LineHeight
              }}
            >
              Chat with the matches you want to learn with.
            </h2>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          style={{
            padding: pictureRowPadding
          }}
        >
          <Col xs={{ span: 16 }} xl={{ span: 8 }}>
            <Slider {...settings}>
              <img
                alt=""
                style={{
                  width: "100%" // styling done for Slider in vote-comparison.css
                }}
                src={firstLandingMatchExample}
              />
              <img
                alt=""
                style={{
                  width: "100%"
                }}
                src={secondLandingMatchExample}
              />
              <img
                alt=""
                style={{
                  width: "100%"
                }}
                src={thirdLandingMatchExample}
              />
            </Slider>
          </Col>
        </Row>
      </div>
    );
  }

  renderLogin() {
    const { loggedInState, windowWidth } = this.props;

    let h2Padding = "120px 0px 60px";
    let h2FontSize = 32;
    let h2LineHeight = 1;
    let loginPadding = "0px 0px 120px";

    if (windowWidth < 768) {
      h2Padding = "60px 0px 30px";
      h2FontSize = 22;
      h2LineHeight = 1.3;
      loginPadding = "0px 0px 60px";
    }

    if (loggedInState === "not_logged_in") {
      return (
        <div>
          <Row
            style={{
              padding: h2Padding
            }}
            type="flex"
            justify="center"
          >
            <Col xs={{ span: 21 }} sm={{ span: 24 }}>
              <h2
                key="0"
                style={{
                  textAlign: "center",
                  color: GREY_9,
                  fontFamily: "Overpass",
                  fontSize: h2FontSize,
                  fontWeight: "bold",
                  marginBottom: 0,
                  lineHeight: h2LineHeight
                }}
              >
                Join Earth's largest community of online learners.
              </h2>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ padding: loginPadding }}>
            <Col>
              <LoginButtons />
            </Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    const metaDescription =
      "Meet your online course partner. infinity2o " +
      "finds you a partner to take an online course with based on what " +
      "you're looking for. Every day, receive two quality matches that you can " +
      "start a conversation with.";
    return (
      <div>
        <Helmet>
          <meta name={metaDescription} />
          <title>Online Course Partners</title>
        </Helmet>
        <Content
          style={{
            background: GREY_9
          }}
        >
          <Marketing />
        </Content>
        <Content
          style={{
            background: GREY_1
          }}
        >
          {this.renderLandingAsks()}
        </Content>
        <Content
          style={{
            background: GREY_9
          }}
        >
          {this.renderMatch()}
        </Content>
        <Content
          style={{
            background: GREY_1
          }}
        >
          {this.renderLogin()}
        </Content>
      </div>
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
    windowWidth: state.customHeader.windowWidth
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const landingDispatchers = bindActionCreators(landingActions, dispatch);

  return {
    fetchLandingPageSortingHatAsks: () => {
      landingDispatchers.fetchLandingPageSortingHatAsks();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
