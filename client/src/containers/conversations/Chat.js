import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as chatActionCreators from "../../actions/conversations/chat";
import { bindActionCreators } from "redux";
import { Layout, Input, Row, Col, List } from "antd";
import CourseRecommendation from "./CourseRecommendation";
import "./Chat.css";

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

    // on desktop with recommended courses
    let chatWindowVerticalHeight = windowHeight - 565; // 565 = header padding + inner content padding + input height + course recommendation height + introduction height

    if (chat.recommendedCourses.length === 0) {
      chatWindowVerticalHeight = windowHeight - 320;
    }

    if (windowWidth < 768) {
      chatWindowVerticalHeight = windowHeight - 521; // = header padding + inner content padding + input height + course recommendation height + introduction height
      if (chat.recommendedCourses.length === 0) {
        chatWindowVerticalHeight = windowHeight - 276;
      }
    }

    chatWindowVerticalHeight = String(chatWindowVerticalHeight) + "px";

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
        <CourseRecommendation />
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
