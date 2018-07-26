import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import { Layout, List, Button, Badge } from "antd";
import "./Contacts.css";
const { Content } = Layout;

class Contacts extends Component {
	componentWillMount() {
		// run once before first render()
	}

	renderOnline(contactIsOnline) {
		if (contactIsOnline) {
			return <Badge status="success" offset={[0, 5]} />;
		}
	}

	renderContactButton(contact) {
		const { colorTheme, contacts, onSelectContact, windowWidth } = this.props;

		let borderColor = colorTheme.text8Color;
		let background = colorTheme.text8Color;
		let color = colorTheme.text4Color;
		if (contacts.conversationId === contact.conversationId) {
			// selected contact
			borderColor = colorTheme.keyText8Color;
			background = colorTheme.keyText8Color;
			color = colorTheme.text2Color;
		}
		let buttonWidth = windowWidth * 0.152; // = 183.3/1200
		if (windowWidth < 576) {
			// 0.815 = 470/576
			buttonWidth = windowWidth * 0.815;
		} else if (windowWidth <= 768) {
			// 0.2174 = 167/768
			buttonWidth = windowWidth * 0.2174;
		} else if (windowWidth < 992) {
			// 0.2244 = 222.7/992
			buttonWidth = windowWidth * 0.2244;
		}
		return (
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
					{contact.matchName}
					{this.renderOnline(contact.isOnline)}
				</Button>
			</Badge>
		);
	}

	render() {
		//console.log('Contacts this.props = ', this.props);
		const { colorTheme, contacts } = this.props;

		return (
			<Content
				style={{
					textAlign: "center",
					padding: "0px 0px 0px", // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<div className="demo-infinite-container">
					<List
						dataSource={contacts.allContacts}
						renderItem={contact => {
							//console.log('contact = ', contact);
							return (
								<List.Item
									style={{
										borderColor: colorTheme.backgroundColor,
										background: colorTheme.backgroundColor,
										padding: "5px 0px 0px"
									}}
								>
									{this.renderContactButton(contact)}
								</List.Item>
							);
						}}
					/>
				</div>
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
