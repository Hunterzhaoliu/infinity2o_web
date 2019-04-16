import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as chatActionCreators from "../../actions/conversations/chat";
import { bindActionCreators } from "redux";
import "./Chat.css";

import { Layout, Input, Row, Col, Icon, List } from "antd";
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
		const {
			conversationId,
			selectedContactOnline,
			selectedContactSocketId,
			selectedContactMongoDBId,
			userId,
			chat
		} = this.props;

		if (chat.currentMessage.replace(/\s/g, "").length) {
			// string does not only contains whitespace
			this.props.sendMessageToServer(
				conversationId,
				selectedContactOnline,
				selectedContactSocketId,
				selectedContactMongoDBId,
				userId,
				chat.currentMessage
			);
		}
	};

	renderMessageStatusIcon(status, item, userId) {
		if (item.senderId === userId) {
			if (status === "sending") {
				return <Icon type="loading" />;
			} else if (status === "sent") {
				return <Icon type="check-circle-o" />;
			} else if (status === "delivered") {
				return <Icon type="check-circle" />;
			} else if (status === "failed-delivery") {
				return <Icon type="warning" />;
			}
		} else {
			// no need to show if partner's message successfully reached us to us
		}
	}

	renderLastMessageDiv(lastMessageDate, lastItemTimeCreated) {
		if (lastMessageDate === lastItemTimeCreated) {
			return <div id="lastMessage" />;
		}
	}

	render() {
		const { colorTheme, chat, userId, windowHeight } = this.props;
		const chatWindowHeight = windowHeight - 180;
		const chatWindowVerticalHeight = chatWindowHeight.toString() + "px";

		document.documentElement.style.setProperty(
			`--text4Color`,
			colorTheme.text4Color
		);

		document.documentElement.style.setProperty(
			`--chat-window-vertical-height`,
			chatWindowVerticalHeight
		);

		// used to place div after last message
		const last50MessagesLength = chat.last50Messages.length;
		let lastMessageDate;
		if (last50MessagesLength > 1) {
			lastMessageDate =
				chat.last50Messages[last50MessagesLength - 1].timeCreated;
		}

		return (
			<Content
				style={{
					textAlign: "center",
					background: colorTheme.textDot5Color,
					padding: "0px 0px 0px 0px"
				}}
			>
				<List
					className="chat-list"
					dataSource={chat.last50Messages}
					renderItem={item => {
						const message = item.content;
						let justifyValue = "start";
						if (item.senderId === userId) {
							justifyValue = "end";
						}

						return (
							<Row
								type="flex"
								justify={justifyValue}
								align="middle"
								style={{
									padding: "0px 0px 0px 0px"
								}}
							>
								<Col>
									<List.Item
										style={{
											padding: "0px 0px 0px 0px"
										}}
									>
										<p
											style={{
												borderColor:
													colorTheme.text8Color,
												borderWidth: "2px",
												background:
													colorTheme.text8Color,
												color: colorTheme.text3Color,
												borderRadius: "25px",
												padding: "4px 15px 4px"
											}}
										>
											{message}
										</p>
									</List.Item>
								</Col>
								<Col>
									<p
										style={{
											color: colorTheme.text8Color,
											padding: "12px 0px 0px 5px"
										}}
									>
										{this.renderMessageStatusIcon(
											"delivered",
											item,
											userId
										)}
									</p>
									{this.renderLastMessageDiv(
										lastMessageDate,
										item.timeCreated
									)}
								</Col>
							</Row>
						);
					}}
				/>
				<Row type="flex" justify="start" align="middle">
					<Col xl={{ span: 24 }}>
						<Input
							className="chat-input"
							value={chat.currentMessage}
							placeHolder="Type a message..."
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
		conversationId: state.contacts.selectedConversationInfo.conversationId,
		selectedContactOnline:
			state.contacts.selectedConversationInfo.selectedContactOnline,
		selectedContactSocketId:
			state.contacts.selectedConversationInfo.selectedContactSocketId,
		selectedContactMongoDBId:
			state.contacts.selectedConversationInfo.selectedContactMongoDBInfo
				.id,
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
