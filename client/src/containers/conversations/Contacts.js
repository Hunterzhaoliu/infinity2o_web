import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import { Layout, List, Button, Badge } from "antd";
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

		const contactWindowHeight = windowHeight - 76;
		const contactWindowVerticalHeight = contactWindowHeight.toString() + "px";
		document.documentElement.style.setProperty(
			`--contact-window-vertical-height`,
			contactWindowVerticalHeight
		);

		const numberOfPixelsPerSpan = windowWidth / 24;
		let buttonWidth = numberOfPixelsPerSpan * 3;
		if (windowWidth < 768) {
			buttonWidth = numberOfPixelsPerSpan * 6;
		}
		return (
			<List
				className="contact-infinite-container"
				dataSource={contacts.allContacts}
				renderItem={contact => {
					let borderColor = colorTheme.text8Color;
					let background = colorTheme.text8Color;
					let color = colorTheme.text4Color;

					if (
						contacts.selectedConversationInfo.conversationId ===
						contact.conversationId
					) {
						// selected contact
						borderColor = colorTheme.keyText8Color;
						background = colorTheme.keyText8Color;
						color = colorTheme.text2Color;
					}

					let contactName = contact.matchName;

					if (windowWidth < 768) {
						// only display first name
						contactName = contact.matchName.replace(/ .*/, "");
					}
					return (
						<List.Item
							style={{
								borderColor: colorTheme.backgroundColor,
								background: colorTheme.backgroundColor,
								padding: "5px 0px 0px"
							}}
						>
							<Badge
								count={contact.numberOfUnseenMessages}
								style={{
									backgroundColor: colorTheme.keyText8Color,
									color: colorTheme.text1Color,
									boxShadow: "0 0 0 1px " + colorTheme.keyText8Color
								}}
								offset={[22, -15]} // [lower, right]
							>
								<Button
									style={{
										borderColor: borderColor,
										background: background,
										color: color,
										height: "44px",
										width: buttonWidth
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
								</Button>
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
					textAlign: "center",
					padding: "0px 0px 0px", // top left&right bottom
					background: colorTheme.backgroundColor
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
