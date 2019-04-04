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

	onCloseConversation(conversationId, contactMongoDBId, firstTwoContacts) {
		if (firstTwoContacts.length === 1) {
			// no other contacts, don't need to select a different contact
		} else {
			// when close conversation, select top most candidate
			let contactToShow = firstTwoContacts[0];
			if (firstTwoContacts[0].conversationId === conversationId) {
				// user trying to delete first conversation so need to show 2nd contact
				contactToShow = firstTwoContacts[1];
			}

			this.props.onSelectContact(
				contactToShow.conversationId,
				contactToShow.isOnline,
				contactToShow.socketId,
				contactToShow.matchId,
				contactToShow.numberOfUnseenMessages
			);
		}

		this.props.onCloseConversation(conversationId, contactMongoDBId);
	}
	renderCloseConversationButton(selectedConversationInfo, firstTwoContacts) {
		const { colorTheme } = this.props;
		return (
			<div style={{ padding: "10px 0px 0px 0px" }}>
				<button
					style={{
						borderColor: colorTheme.text8Color,
						background: colorTheme.text8Color,
						color: colorTheme.text4Color,
						height: "44px"
					}}
					onClick={e =>
						this.onCloseConversation(
							selectedConversationInfo.conversationId,
							selectedConversationInfo.selectedContactMongoDBInfo
								.id,
							firstTwoContacts
						)
					}
				>
					Close Conversation
				</button>
			</div>
		);
	}

	renderConversations() {
		const { colorTheme, contacts } = this.props;

		if (
			contacts.allContacts !== undefined &&
			contacts.allContacts.length >= 1
		) {
			return (
				<Row type="flex" justify="center" align="middle">
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
						style={{
							padding: "0px 5px 0px"
						}}
					>
						<ContactCard />
						{this.renderCloseConversationButton(
							contacts.selectedConversationInfo,
							contacts.allContacts.slice(0, 2)
						)}
					</Col>
					<Col
						sm={{ span: 6 }}
						md={{ span: 6 }}
						lg={{ span: 3 }}
						xl={{ span: 3 }}
						style={{
							color: colorTheme.text3Color
						}}
					>
						<Contacts />
					</Col>
					<Col
						sm={{ span: 18 }}
						md={{ span: 18 }}
						lg={{ span: 9 }}
						xl={{ span: 9 }}
						style={{
							padding: "5px 0px 0px 5px"
						}}
					>
						<Chat />
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
					>
						<VoteComparison />
					</Col>
				</Row>
			);
		} else {
			return (
				<h2
					style={{
						padding: "60px 0px 0px",
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
					padding: "75px 0px 0px 0px",
					background: colorTheme.backgroundColor
				}}
			>
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
