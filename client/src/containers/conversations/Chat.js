import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as chatActionCreators from "../../actions/conversations/chat";
import { bindActionCreators } from "redux";
import { Layout, Input, Row, Col, List, Avatar } from "antd";
import "./Chat.css";

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

	renderPicture(imageUrl) {
		if (imageUrl !== undefined && imageUrl !== null) {
			return (
				<Avatar
					style={{
						width: "50px",
						height: "50px"
					}}
					shape="circle"
					src={imageUrl}
				/>
			);
		} else {
			return <div />;
		}
	}

	renderLastMessageDiv(last50Messages, lastMessageTime) {
		// used to place div after last message
		const last50MessagesLength = last50Messages.length;
		let lastMessageDate;
		if (last50MessagesLength > 1) {
			lastMessageDate =
				last50Messages[last50MessagesLength - 1].timeCreated;
		}

		if (lastMessageDate === lastMessageTime) {
			return <div id="lastMessage" />;
		}
	}

	renderMessages() {
		const { chat, colorTheme, userId } = this.props;

		for (
			let messageIndex = 0;
			messageIndex < chat.last50Messages.length;
			messageIndex++
		) {}
	}

	render() {
		const {
			colorTheme,
			chat,
			windowHeight,
			selectedConversationInfo,
			userId
		} = this.props;
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

		return (
			<Content
				style={{
					textAlign: "center",
					background: colorTheme.textDot5Color,
					padding: "0px 0px 0px 0px"
				}}
			>
				<Row type="flex" justify="center" align="middle">
					<Col />
				</Row>
				<Row type="flex" justify="center" align="middle">
					<Col />
				</Row>
				<Row style={{ padding: "0px 30px 0px" }}>
					<Col>
						<List
							className="chat-list"
							dataSource={chat.last50Messages}
							renderItem={item => {
								const message = item.content;
								let justifyValue = "start";
								let messageBackgroundColor =
									colorTheme.keyText8Color;
								if (item.senderId === userId) {
									messageBackgroundColor =
										colorTheme.keyCompliment1Text8Color;
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
												style={{ padding: "0px 0px" }}
											>
												<p
													style={{
														background: messageBackgroundColor,
														color:
															colorTheme.text3Color,
														padding: "6px 12px 7px",
														fontFamily: "Overpass",
														fontSize: "14px"
													}}
												>
													{message}
												</p>
											</List.Item>
										</Col>
										<Col>
											{this.renderLastMessageDiv(
												chat.last50Messages,
												item.timeCreated
											)}
										</Col>
									</Row>
								);
							}}
						/>
					</Col>
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
