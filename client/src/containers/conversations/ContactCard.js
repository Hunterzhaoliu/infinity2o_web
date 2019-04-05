import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Avatar } from "antd";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import LinkedIn from "../profileInformation/LinkedIn";
import Github from "../profileInformation/Github";
import Interests from "../profileInformation/Interests";
import TimeZone from "../profileInformation/TimeZone";
import "./contact-card.css";

class ContactCard extends Component {
	renderContactAge(matchAge, colorThemeText6Color) {
		if (matchAge !== undefined && matchAge !== null) {
			return (
				<Col>
					<h4
						style={{
							color: colorThemeText6Color,
							fontFamily: "Overpass",
							lineHeight: 1,
							marginBottom: 0,
							fontSize: 26
						}}
					>
						{", "}
						{matchAge}
					</h4>
				</Col>
			);
		}
	}

	renderContactTotalVotes(totalUserVotes) {
		const { colorTheme } = this.props;

		let voteDescription;
		if (totalUserVotes <= 1) {
			voteDescription = " vote";
		} else {
			voteDescription = " votes";
		}
		return (
			<Row
				style={{ padding: "15px 0px 0px 0px" }}
				type="flex"
				justify="center"
				align="middle"
			>
				<Col>
					<h4
						style={{
							color: colorTheme.text4Color,
							fontFamily: "Overpass",
							lineHeight: 1,
							marginBottom: 0,
							fontSize: 20
						}}
					>
						{totalUserVotes} {voteDescription}
					</h4>
				</Col>
			</Row>
		);
	}

	renderContactPicture(imageUrl, keyColor) {
		if (imageUrl !== undefined && imageUrl !== null) {
			return (
				<Row type="flex" justify="center" align="middle">
					<div
						style={{
							width: "100%",
							height: "90px",
							backgroundColor: keyColor
						}}
					/>
					<Avatar
						style={{
							position: "absolute",
							top: "60px",
							width: "125px",
							height: "125px"
						}}
						shape="circle"
						src={imageUrl}
					/>
				</Row>
			);
		} else {
			return <div />;
		}
	}

	renderCloseConversationButton(text6Color) {
		const { contacts } = this.props;
		return (
			<button
				style={{
					color: text6Color
				}}
				className="close-conversation-button"
				onClick={e =>
					this.onCloseConversation(
						contacts.selectedConversationInfo.conversationId,
						contacts.selectedConversationInfo
							.selectedContactMongoDBInfo.id,
						contacts.allContacts.slice(0, 2)
					)
				}
			>
				x
			</button>
		);
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

	render() {
		const { contacts, colorTheme } = this.props;

		const selectedContact =
			contacts.selectedConversationInfo.selectedContactMongoDBInfo;
		return (
			<Card
				bordered="false"
				loading={false}
				style={{
					color: colorTheme.text1Color,
					borderColor: colorTheme.textDot5Color,
					background: colorTheme.textDot5Color
				}}
				bodyStyle={{ padding: "0px 0px 60px 0px" }} // padding around inside border of card
			>
				<Row
					style={{
						backgroundColor: colorTheme.key,
						height: "40px"
					}}
					type="flex"
					justify="end"
					align="middle"
				>
					{this.renderCloseConversationButton(colorTheme.text6Color)}
				</Row>
				{this.renderContactPicture(
					selectedContact.imageUrl,
					colorTheme.key
				)}
				<Row
					style={{ padding: "90px 0px 0px 0px" }}
					type="flex"
					justify="center"
					align="middle"
				>
					<Col>
						<h4
							style={{
								color: colorTheme.keyText6Color,
								fontFamily: "Overpass",
								lineHeight: 1,
								marginBottom: 0,
								fontSize: 26
							}}
						>
							{selectedContact.name}
						</h4>
					</Col>
					{this.renderContactAge(
						selectedContact.age,
						colorTheme.text6Color
					)}
					<LinkedIn
						value={selectedContact.linkedInPublicProfileUrl}
					/>
					<Github value={selectedContact.githubPublicProfileUrl} />
				</Row>
				{this.renderContactTotalVotes(selectedContact.totalUserVotes)}
				<Row
					style={{ padding: "0px 0px 0px 20px" }}
					type="flex"
					justify="start"
					align="middle"
				>
					<Col>
						<Interests interests={selectedContact.interests} />
						<TimeZone value={selectedContact.timeZone} />
					</Col>
				</Row>
			</Card>
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
		contacts: state.contacts
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const contactsDispatchers = bindActionCreators(
		contactsActionCreators,
		dispatch
	);

	return {
		onCloseConversation: (conversationId, contactMongoDBId) => {
			contactsDispatchers.onCloseConversation(
				conversationId,
				contactMongoDBId
			);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactCard);
