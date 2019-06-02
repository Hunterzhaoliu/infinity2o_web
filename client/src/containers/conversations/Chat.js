import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as chatActionCreators from "../../actions/conversations/chat";
import { bindActionCreators } from "redux";
import { Layout, Input, Row, Col, List } from "antd";
import Slider from "react-slick";
import "./Chat.css";
import dolphin from "../images/dolphin.jpg";
import dollarSign from "../images/dollarSign.png";
import courseLength from "../images/courseLength.png";

const { Content } = Layout;

class Chat extends Component {
  componentDidUpdate() {
    if (
      this.props.chat.currentMessage === null &&
      document.getElementById("lastMessage") !== null
    ) {
      // when typing new message, no need to scroll back down
      document.getElementById("lastMessage").scrollIntoView();
    }
  }

  renderRecommendedCourse(recommendedCourse) {
    const { colorTheme } = this.props;
    return (
      <div>
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
            <img className="course-description-img" src={courseLength} alt="" />
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
  }

  renderRecommendedCourses() {
    const { chat } = this.props;

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

    if (chat.recommendedCourses.length !== 0) {
      const firstRecommendedCourse = chat.recommendedCourses[0];
      const secondRecommendedCourse = chat.recommendedCourses[1];
      return (
        <Slider {...settings}>
          {this.renderRecommendedCourse(firstRecommendedCourse)}
          {this.renderRecommendedCourse(secondRecommendedCourse)}
        </Slider>
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

  onChangeCurrentMessage = e => {
    // console.log('e.target.value = ', e.target.value);
    this.props.onChangeCurrentMessage(e.target.value);
  };

  onPressEnter = () => {
    //console.log('pressed enter');
    const { selectedConversationInfo, userId, chat } = this.props;
    if (
      chat.currentMessage !== null &&
      chat.currentMessage.replace(/\s/g, "").length > 0
    ) {
      // string does not only contains whitespace
      this.props.sendMessageToServer(
        selectedConversationInfo.conversationId,
        selectedConversationInfo.selectedContactOnline,
        selectedConversationInfo.selectedContactSocketId,
        selectedConversationInfo.selectedContactMongoDBInfo.id,
        userId,
        chat.currentMessage
      );
    }
  };

  renderLastMessageDiv(messageIndex, messagesLength) {
    // used to place div after last message
    if (messageIndex === messagesLength - 1) {
      return (
        <Col>
          <div id="lastMessage" />
        </Col>
      );
    }
  }

  renderChatDisplay() {
    const { chat, colorTheme, userId, windowHeight, windowWidth } = this.props;

    let chatWindowVerticalHeight = String(windowHeight - 240) + "px"; // 240 = header padding + inner content padding + input height

    if (windowWidth < 768) {
      chatWindowVerticalHeight = String(windowHeight - 180) + "px";
    }

    if (chat.last50Messages.length > 0) {
      // messages exist, return list of messages
      return (
        <List
          style={{ height: chatWindowVerticalHeight }}
          dataSource={chat.last50Messages}
          renderItem={(messageInfo, messageIndex) => {
            const message = messageInfo.content;
            let justifyValue = "start";
            let messageBackgroundColor = colorTheme.keyText8Color;
            if (messageInfo.senderId === userId) {
              messageBackgroundColor = colorTheme.keyCompliment1Text8Color;
              justifyValue = "end";
            }

            let messageMarginBottom = "2px";
            if (
              messageIndex !== chat.last50Messages.length - 1 &&
              chat.last50Messages[messageIndex + 1].senderId !==
                messageInfo.senderId
            ) {
              // different person sending upcoming message so need to add additional padding
              messageMarginBottom = "30px";
            }
            return (
              <Row type="flex" justify={justifyValue} align="middle">
                <Col>
                  <List.Item style={{ padding: "0px 0px" }}>
                    <p
                      style={{
                        background: messageBackgroundColor,
                        color: colorTheme.text2Color,
                        padding: "6px 12px 7px",
                        fontFamily: "Overpass",
                        fontSize: "16px",
                        marginBottom: messageMarginBottom
                      }}
                    >
                      {message}
                    </p>
                  </List.Item>
                </Col>
                {this.renderLastMessageDiv(
                  messageIndex,
                  chat.last50Messages.length
                )}
              </Row>
            );
          }}
        />
      );
    }
  }

  render() {
    const { colorTheme, chat } = this.props;

    document.documentElement.style.setProperty(
      `--textDot5Color`,
      colorTheme.textDot5Color
    );
    document.documentElement.style.setProperty(
      `--text4Color`,
      colorTheme.text4Color
    );

    return (
      <Content
        style={{
          backgroundColor: colorTheme.textDot5Color,
          borderWidth: "1px 1px 0px 0px",
          borderStyle: "solid",
          borderColor: colorTheme.text8Color
        }}
      >
        <Row style={{ padding: "30px 30px 0px" }}>
          <Col> {this.renderRecommendedCourses()}</Col>
        </Row>
        <Row style={{ padding: "0px 30px" }}>
          <Col> {this.renderIntroduction()}</Col>
        </Row>
        <Row style={{ padding: "30px" }}>
          <Col> {this.renderChatDisplay()}</Col>
        </Row>
        <Row type="flex" justify="start" align="middle">
          <Col xs={{ span: 24 }} xl={{ span: 24 }}>
            <Input
              className="chat-input"
              value={chat.currentMessage}
              placeholder="Type a message..."
              onChange={this.onChangeCurrentMessage}
              onPressEnter={this.onPressEnter}
              style={{
                borderColor: colorTheme.text8Color,
                background: colorTheme.textDot5Color,
                color: colorTheme.text8Color
              }}
            />
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
    colorTheme: state.colorTheme,
    chat: state.chat,
    userId: state.auth.mongoDBUserId,
    selectedConversationInfo: state.contacts.selectedConversationInfo,
    windowHeight: state.customHeader.windowHeight,
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
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );

  const chatDispatchers = bindActionCreators(chatActionCreators, dispatch);
  return {
    onPressConversations: () => {
      colorThemeDispatchers.onPressConversations();
    },
    onChangeCurrentMessage: newMessage => {
      chatDispatchers.onChangeCurrentMessage(newMessage);
    },
    sendMessageToServer: (
      conversationId,
      selectedContactOnline,
      selectedContactSocketId,
      selectedContactMongoDBId,
      userId,
      currentMessage
    ) => {
      chatDispatchers.sendMessageToServer(
        conversationId,
        selectedContactOnline,
        selectedContactSocketId,
        selectedContactMongoDBId,
        userId,
        currentMessage
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
