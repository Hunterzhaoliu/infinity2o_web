import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as chatActionCreators from "../../actions/conversations/chat";
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import Slider from "react-slick";
import "./course-recommendation.css";
import dolphin from "../images/dolphin.jpg";
import dollarSign from "../images/dollarSign.png";
import courseLength from "../images/courseLength.png";

class CourseRecommendation extends Component {
  renderRecommendedCourses(recommendedCourses) {
    const { colorTheme } = this.props;

    return _.map(recommendedCourses, (recommendedCourse, index) => {
      return (
        <div key={index}>
          <Row type="flex" justify="center">
            <Col>
              <h3
                style={{ color: colorTheme.text2Color }}
                className="course-name"
              >
                {recommendedCourse.name}
              </h3>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <h4
                style={{ color: colorTheme.text2Color }}
                className="school-and-provider-name"
              >
                {recommendedCourse.schoolOfferingCourse} at{" "}
                {recommendedCourse.provider}
              </h4>
            </Col>
          </Row>
          <Row
            style={{
              paddingTop: "15px"
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            <Col>
              <img className="course-description-img" src={dollarSign} alt="" />
            </Col>
            <Col>
              <h5
                style={{ color: colorTheme.text3Color }}
                className="course-description"
              >
                {recommendedCourse.cost}
              </h5>
            </Col>
          </Row>
          <Row
            style={{
              paddingTop: "15px"
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            <Col>
              <img
                className="course-description-img"
                src={courseLength}
                alt=""
              />
            </Col>
            <Col>
              <h5
                style={{ color: colorTheme.text3Color }}
                className="course-description"
              >
                {recommendedCourse.length} Weeks
              </h5>
            </Col>
          </Row>
          <Row
            style={{
              paddingTop: "15px",
              paddingBottom: "30px"
            }}
            type="flex"
            justify="center"
            align="middle"
          >
            <Col>
              <button
                style={{
                  borderColor: colorTheme.backgroundColor,
                  background: colorTheme.backgroundColor,
                  color: colorTheme.text3Color
                }}
                className="completed-course-button"
                onClick={e =>
                  this.props.alreadyTakenCourse(
                    recommendedCourse.name,
                    recommendedCourse.provider
                  )
                }
              >
                Completed
              </button>
            </Col>
            <Col offset={3}>
              <a
                style={{
                  borderColor: colorTheme.backgroundColor,
                  background: colorTheme.backgroundColor,
                  color: colorTheme.text3Color
                }}
                className="interested-in-course-a"
                target="_blank"
                href={recommendedCourse.link}
              >
                Interested
              </a>
            </Col>
          </Row>
        </div>
      );
    });
  }

  renderRecommendedCoursesSlider() {
    const { chat } = this.props;

    if (chat.recommendedCourses.length !== 0) {
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
        <div style={{ minHeight: "245px" }}>
          <Slider {...settings}>
            {this.renderRecommendedCourses(chat.recommendedCourses)}
          </Slider>
        </div>
      );
    }
  }

  renderPicture(pictureUrl, textDot5Color) {
    if (pictureUrl === undefined || pictureUrl === null) {
      pictureUrl = dolphin;
    }
    return (
      <img
        style={{
          borderColor: textDot5Color
        }}
        onError={error => {
          // in case the imageUrl is invalid
          error.target.onerror = null;
          error.target.src = dolphin;
        }}
        className="chat-profile-img"
        src={pictureUrl}
        alt=""
      />
    );
  }

  renderIntroduction() {
    const {
      selectedConversationInfo,
      userImageUrl,
      userInterests,
      colorTheme
    } = this.props;

    const contactInterests =
      selectedConversationInfo.selectedContactMongoDBInfo.interests;

    let sharedInterests = [];
    if (contactInterests !== null) {
      sharedInterests = userInterests.filter(userInterest =>
        contactInterests.includes(userInterest)
      );
    }

    let welcomeMessage = "Say Hi to your new match!";
    if (sharedInterests.length === 1) {
      // user and contact share one interest, reformat interest and add to welcomeMessage
      const formattedInterest = sharedInterests[0].replace("_", " ");
      welcomeMessage = "Share interest in " + formattedInterest;
    } else if (sharedInterests.length === 2) {
      // user and contact share two interests
      const formattedFirstInterest = sharedInterests[0].replace("_", " ");
      const formattedSecondInterest = sharedInterests[1].replace("_", " ");

      welcomeMessage =
        "Share interest in " +
        formattedFirstInterest +
        " & " +
        formattedSecondInterest;
    } else if (sharedInterests.length > 2) {
      // user and contact share multiple interests
      welcomeMessage = "Share " + String(sharedInterests.length) + " interests";
    }

    return (
      <Row type="flex" justify="center" align="middle">
        <Col>
          <div className="chat-images">
            <div className="chat-contact-picture">
              {this.renderPicture(
                selectedConversationInfo.selectedContactMongoDBInfo.imageUrl,
                colorTheme.textDot5Color
              )}
            </div>
            {this.renderPicture(userImageUrl, colorTheme.textDot5Color)}
          </div>
        </Col>
        <Col offset={1}>
          <p
            style={{ color: colorTheme.text2Color }}
            className="welcome-message"
          >
            {welcomeMessage}
          </p>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div>
        <Row style={{ padding: "30px 30px 0px" }}>
          <Col> {this.renderRecommendedCoursesSlider()}</Col>
        </Row>
        <Row style={{ padding: "0px 30px" }}>
          <Col> {this.renderIntroduction()}</Col>
        </Row>
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
    colorTheme: state.colorTheme,
    chat: state.chat,
    selectedConversationInfo: state.contacts.selectedConversationInfo,
    windowWidth: state.customHeader.windowWidth,
    userImageUrl: state.profile.imageUrl,
    userInterests: state.profile.interests
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const chatDispatchers = bindActionCreators(chatActionCreators, dispatch);
  return {
    alreadyTakenCourse: (courseName, courseProvider) => {
      chatDispatchers.alreadyTakenCourse(courseName, courseProvider);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseRecommendation);
