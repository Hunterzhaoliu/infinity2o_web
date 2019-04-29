import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as chatActionCreators from "../../actions/conversations/chat";
import { bindActionCreators } from "redux";
import { Layout, Input, Row, Col, List } from "antd";
import "./Chat.css";
import dolphin from "../images/dolphin.jpg";

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

		if (chat.currentMessage.replace(/\s/g, "").length) {
			// string does not only contains whitespace
			this.props.sendMessageToServer(
				selectedConversationInfo.conversationId,
				selectedConversationInfo.selectedContactOnline,
				selectedConversationInfo.selectedContactSocketId,
				selectedConversationInfo.selectedContactMongoDBId,
				userId,
				chat.currentMessage
			);
		}
	};

	renderPicture(pictureUrl, textDot5Color) {
		if (pictureUrl === undefined || pictureUrl === null) {
			pictureUrl = dolphin;
		}
		return (
			<img
				style={{
					border: "2px solid " + textDot5Color
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

	renderChatDisplay() {
		const { chat, colorTheme, userId, windowHeight } = this.props;

		const chatWindowHeight = windowHeight - 240;
		const chatWindowVerticalHeight = chatWindowHeight.toString() + "px";

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
							messageBackgroundColor =
								colorTheme.keyCompliment1Text8Color;
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
							<Row
								type="flex"
								justify={justifyValue}
								align="middle"
							>
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
		} else {
			const { selectedConversationInfo, userImageUrl } = this.props;
			// no messages exist, display greeting and welcome message
			return (
				<div style={{ height: chatWindowVerticalHeight }}>
					<div className="chat-images">
						<div className="chat-contact-picture">
							{this.renderPicture(
								selectedConversationInfo
									.selectedContactMongoDBInfo.imageUrl,
								colorTheme.textDot5Color
							)}
						</div>
						{this.renderPicture(
							userImageUrl,
							colorTheme.textDot5Color
						)}
					</div>
					<p className="welcome-message">Say hi to your new Match!</p>
				</div>
			);
		}
	}

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
				<Row style={{ padding: "30px" }}>
					<Col> {this.renderChatDisplay()}</Col>
				</Row>
				<Row type="flex" justify="start" align="middle">
					<Col xl={{ span: 24 }}>
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
		userImageUrl: state.profile.imageUrl
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
