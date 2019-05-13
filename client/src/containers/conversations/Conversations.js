import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import ContactCard from "./ContactCard";
import Chat from "./Chat";
import Contacts from "./Contacts";
import VoteComparison from "./VoteComparison";
import { Layout, Row, Col } from "antd";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Conversation extends Component {
  componentWillMount() {
    const { loggedInState } = this.props;
    if (loggedInState === "not_logged_in") {
      // push user to landing page
      this.props.history.push("/");
    } else {
      // run once before first render()
      this.props.onConversations();
      // userVotes is to compare the questions that user and contact voted on
      this.props.fetchConversations();
    }
  }

  renderContactInformation() {
    const { contacts } = this.props;

    if (contacts.selectedConversationInfo.showContactCard) {
      return (
        <Row>
          <Col>
            <ContactCard />
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col>
            <VoteComparison />
          </Col>
        </Row>
      );
    }
  }
  renderConversations() {
    const { colorTheme, contacts, windowWidth } = this.props;

    if (
      contacts.allContacts !== undefined &&
      contacts.allContacts.length >= 1
    ) {
      let additionalContentPadding = "60px 0px 0px";
      let contactCardPadding = "40px 0px 0px 0px";
      if (windowWidth < 768) {
        contactCardPadding = "0px";
        additionalContentPadding = "0px";
      }
      return (
        <Row
          style={{ padding: additionalContentPadding }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col
            xs={{ span: 0 }}
            sm={{ span: 6, offset: 2 }}
            md={{ span: 6, offset: 2 }}
            lg={{ span: 4, offset: 2 }}
            xl={{ span: 4, offset: 2 }}
          >
            <Contacts />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 14 }}
            md={{ span: 14 }}
            lg={{ span: 9 }}
            xl={{ span: 9 }}
          >
            <Chat />
          </Col>
          <Col
            xs={{ span: 0 }}
            sm={{ span: 0 }}
            md={{ span: 0 }}
            lg={{ offset: 1, span: 6 }}
            xl={{ offset: 1, span: 6 }}
            style={{ padding: contactCardPadding }}
          >
            {this.renderContactInformation()}
          </Col>
        </Row>
      );
    } else {
      let h2FontSize = "32px";
      if (windowWidth < 768) {
        h2FontSize = "22px";
      }
      return (
        <Row type="flex" justify="center">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 20 }}
            md={{ span: 24 }}
            lg={{ span: 15 }}
            xl={{ span: 10 }}
          >
            <h2
              style={{
                color: colorTheme.text2Color,
                fontFamily: "Overpass",
                padding: "60px 0px 0px",
                lineHeight: 1,
                marginBottom: 0,
                fontSize: h2FontSize
              }}
            >
              Start a new conversation in Matches.
            </h2>
          </Col>
        </Row>
      );
    }
  }

  render() {
    const { colorTheme } = this.props;
    return (
      <Content
        style={{
          textAlign: "center",
          padding: "60px 0px 0px",
          background: colorTheme.backgroundColor
        }}
      >
        <Helmet>
          <title>Conversations</title>
        </Helmet>
        {this.renderConversations()}
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.customHeader.windowWidth,
    loggedInState: state.auth.loggedInState,
    colorTheme: state.colorTheme,
    chat: state.chat,
    contacts: state.contacts
  };
}

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
    onConversations: () => {
      colorThemeDispatchers.onConversations();
    },
    fetchConversations: () => {
      contactsDispatchers.fetchConversations();
    },
    onSelectContact: (
      conversationId,
      isOnline,
      socketId,
      matchId,
      numberOfUnseenMessages
    ) => {
      contactsDispatchers.onSelectContact(
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
)(Conversation);
