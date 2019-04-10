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

	renderContactButton() {
		const {
			colorTheme,
			contacts,
			onSelectContact,
			windowWidth,
			windowHeight
		} = this.props;

		const contactWindowHeight = windowHeight - 180;
		const contactWindowVerticalHeight =
			contactWindowHeight.toString() + "px";
		document.documentElement.style.setProperty(
			`--contact-window-vertical-height`,
			contactWindowVerticalHeight
		);

		const numberOfPixelsPerSpan = windowWidth / 24;
		let buttonWidth = numberOfPixelsPerSpan * 5;
		if (windowWidth < 768) {
			buttonWidth = numberOfPixelsPerSpan * 6;
		}
		return (
			<List
				className="contact-infinite-container"
				dataSource={contacts.allContacts}
				renderItem={contact => {
					let borderColor = colorTheme.textDot5Color;
					let background = colorTheme.textDot5Color;
					let color = colorTheme.text4Color;
					let fontWeight = "400px";

					if (
						contacts.selectedConversationInfo.conversationId ===
						contact.conversationId
					) {
						// selected contact
						borderColor = colorTheme.keyText8Color;
						background = colorTheme.keyText8Color;
						color = colorTheme.text2Color;
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
							<Badge
								count={contact.numberOfUnseenMessages}
								style={{
									backgroundColor: colorTheme.keyText8Color,
									color: colorTheme.text1Color,
									boxShadow:
										"0 0 0 1px " + colorTheme.keyText8Color
								}}
								offset={[22, -15]} // [lower, right]
							>
								<button
									className="contacts-button"
									style={{
										borderColor: borderColor,
										background: background,
										color: color,
										width: buttonWidth,
										fontWeight: fontWeight
									}}
									onClick={e =>
										onSelectContact(
											contact.conversationId,
											contact.isOnline,
											contact.socketId,
											contact.matchId,
											contact.numberOfUnseenMessages
										)
									}
								>
									{contactName}
									{this.renderOnline(contact.isOnline)}
								</button>
							</Badge>
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
					background: colorTheme.textDot5Color
				}}
			>
				{this.renderContactButton()}
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
		windowHeight: state.customHeader.windowHeight
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
)(Contacts);
