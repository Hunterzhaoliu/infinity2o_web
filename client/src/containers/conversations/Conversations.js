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
		const { colorTheme, contacts } = this.props;

		if (
			contacts.allContacts !== undefined &&
			contacts.allContacts.length >= 1
		) {
			return (
				<Row type="flex" justify="start" align="top">
					<Col
						sm={{ span: 6 }}
						md={{ span: 6 }}
						lg={{ span: 4 }}
						xl={{ span: 4, offset: 2 }}
					>
						<Contacts />
					</Col>
					<Col
						sm={{ span: 18 }}
						md={{ span: 18 }}
						lg={{ span: 9 }}
						xl={{ span: 9 }}
					>
						<Chat />
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 6 }}
						xl={{ offset: 1, span: 6 }}
						style={{ padding: "80px 0px 0px 0px" }}
					>
						{this.renderContactInformation()}
					</Col>
				</Row>
			);
		} else {
			return (
				<h2
					style={{
						color: colorTheme.text2Color,
						fontFamily: "Overpass",
						lineHeight: 1,
						marginBottom: 0,
						fontSize: "32px"
					}}
				>
					Start a new conversation in Matches.
				</h2>
			);
		}
	}

	render() {
		const { colorTheme } = this.props;

		return (
			<Content
				style={{
					textAlign: "center",
					padding: "120px 0px 0px 0px",
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
