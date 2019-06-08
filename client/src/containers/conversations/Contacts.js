import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import { Layout, List, Badge } from "antd";
import "./Contacts.css";
const { Content } = Layout;

class Contacts extends Component {
  renderOnline(contactIsOnline) {
    if (contactIsOnline) {
      return <Badge status="success" offset={[0, 5]} />;
    }
  }

  renderContactButtons() {
    const {
      colorTheme,
      contacts,
      onSelectContact,
      windowWidth,
      windowHeight,
      userVotes,
      userCompletedCourses,
      userInterests
    } = this.props;

    const contactWindowHeight = windowHeight - 120;
    const contactWindowVerticalHeight = contactWindowHeight.toString() + "px";
    document.documentElement.style.setProperty(
      `--contact-window-vertical-height`,
      contactWindowVerticalHeight
    );

    document.documentElement.style.setProperty(
      `--keyText8Color`,
      colorTheme.keyText8Color
    );
    return (
      <List
        className="contacts-list"
        dataSource={contacts.allContacts}
        renderItem={contact => {
          let borderColor = colorTheme.textDot5Color;
          let background = colorTheme.textDot5Color;
          let fontWeight = "400px";
          let buttonLeftSideColor = colorTheme.textDot5Color;

          if (
            contacts.selectedConversationInfo.conversationId ===
            contact.conversationId
          ) {
            // selected contact
            borderColor = colorTheme.keyText8Color;
            background = colorTheme.keyText8Color;
            buttonLeftSideColor = colorTheme.keyText6Color;
          }

          if (contact.numberOfUnseenMessages > 0) {
            // contact has unread message, make contact name bold
            fontWeight = "600px";
          }

          let contactName = contact.matchName;

          if (windowWidth < 768) {
            // only display first name
            contactName = contact.matchName.replace(/ .*/, "");
          }
          return (
            <List.Item style={{ padding: "0px 0px 0px 0px" }}>
              <button
                className="contacts-button"
                style={{
                  borderColor: borderColor,
                  background: background,
                  color: colorTheme.text4Color,
                  fontWeight: fontWeight,
                  boxShadow: "4px 0px 0px 0px " + buttonLeftSideColor + " inset"
                }}
                onClick={e =>
                  onSelectContact(
                    userVotes,
                    userCompletedCourses,
                    userInterests,
                    contact.conversationId,
                    contact.isOnline,
                    contact.socketId,
                    contact.matchId,
                    contact.numberOfUnseenMessages
                  )
                }
              >
                <Badge
                  count={contact.numberOfUnseenMessages}
                  style={{
                    backgroundColor: colorTheme.keyText8Color,
                    color: colorTheme.text3Color,
                    boxShadow: "none",
                    marginRight: "10px",
                    fontFamily: "Overpass",
                    fontSize: "12px"
                  }}
                />
                {contactName}
                {this.renderOnline(contact.isOnline)}
              </button>
            </List.Item>
          );
        }}
      />
    );
  }
  render() {
    const { colorTheme } = this.props;

    return (
      <Content
        style={{
          background: colorTheme.textDot5Color,
          border: "1px solid " + colorTheme.text8Color
        }}
      >
        {this.renderContactButtons()}
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
    contacts: state.contacts,
    windowWidth: state.customHeader.windowWidth,
    windowHeight: state.customHeader.windowHeight,
    userVotes: state.profile.asks.votes,
    userCompletedCourses: state.profile.completedCourses,
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

  const contactsDispatchers = bindActionCreators(
    contactsActionCreators,
    dispatch
  );

  return {
    onPressConversations: () => {
      colorThemeDispatchers.onPressConversations();
    },
    onSelectContact: (
      userVotes,
      userCompletedCourses,
      userInterests,
      conversationId,
      isOnline,
      socketId,
      matchId,
      numberOfUnseenMessages
    ) => {
      contactsDispatchers.onSelectContact(
        userVotes,
        userCompletedCourses,
        userInterests,
        conversationId,
        isOnline,
        socketId,
        matchId,
        numberOfUnseenMessages
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
