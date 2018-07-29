import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as chatActionCreators from "../../actions/conversations/chat";
import { bindActionCreators } from "redux";
import "./Chat.css";

import { Layout, Input, Row, Col, Affix, Icon, List } from "antd";
import { animateScroll as scroll } from "react-scroll";
const { Content } = Layout;

class Chat extends Component {
	onChangeCurrentMessage = e => {
		// console.log('e.target.value = ', e.target.value);
		this.props.onChangeCurrentMessage(e.target.value);
	};

	scrollToBottom = () => {
		scroll.scrollToBottom();
	};

	onPressEnter = () => {
		//console.log('pressed enter');
		const {
			name,
			mongoDBUserId,
			conversationId,
			chat,
			selectedContactOnline,
			selectedContactSocketId,
			selectedContactMongoDBUserId
		} = this.props;
		this.props.sendMessageToServer(
			conversationId,
			selectedContactOnline,
			selectedContactSocketId,
			selectedContactMongoDBUserId,
			name,
			mongoDBUserId,
			chat.currentMessage
		);
	};

	renderMessageStatusIcon(status, item, name) {
		if (item.senderName === name) {
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

	render() {
		//console.log('Chat this.props = ', this.props);
		const { colorTheme, chat, name, windowWidth, windowHeight } = this.props;
		const chatWindowHeight = windowHeight - 112;
		const chatWindowVerticalHeight = chatWindowHeight.toString() + "px";
		document.documentElement.style.setProperty(
			`--chat-window-vertical-height`,
			chatWindowVerticalHeight
		);

		// finding the right number of pixels for the chat input
		const numberOfPixelsPerSpan = (windowWidth - 100) / 24;
		let inputWidth = numberOfPixelsPerSpan * 10 - 17;
		if (windowWidth < 768) {
			inputWidth = numberOfPixelsPerSpan * 18 - 17;
		}

		return (
			<Content
				style={{
					textAlign: "center",
					background: colorTheme.backgroundColor
				}}
			>
				<div className="chat-window-infinite-container">
					<List
						dataSource={chat.last50Messages}
						renderItem={item => {
							const message = item.content;
							let justifyValue = "start";
							if (item.senderName === name) {
								// TODO: what if both people's names are the senderName
								// need to switch to unique identifier
								justifyValue = "end";
							}
							return (
								<Row
									type="flex"
									justify={justifyValue}
									align="middle"
									style={{
										padding: "0px 0px 0px"
									}}
								>
									<Col>
										<List.Item
											style={{
												padding: "0px 0px 0px"
											}}
										>
											<p
												style={{
													borderColor: colorTheme.text8Color,
													borderWidth: "2px",
													background: colorTheme.text8Color,
													color: colorTheme.text3Color,
													borderRadius: "25px",
													padding: "4px 15px 4px"
												}}
											>
												{message}
											</p>
										</List.Item>
									</Col>
									<Col xl={{ span: 1 }}>
										<p
											style={{
												color: colorTheme.text8Color,
												padding: "12px 4px 0px"
											}}
										>
											{this.renderMessageStatusIcon("delivered", item, name)}
										</p>
									</Col>
								</Row>
							);
						}}
					/>
				</div>
				<Affix offsetBottom={0}>
					<Row type="flex" justify="start" align="middle">
						<Col>
							<Input
								value={chat.currentMessage}
								placeholder="type here..."
								onChange={this.onChangeCurrentMessage}
								onPressEnter={this.onPressEnter}
								style={{
									width: inputWidth,
									borderColor: colorTheme.text7Color,
									background: colorTheme.text7Color,
									color: colorTheme.text1Color
								}}
							/>
						</Col>
					</Row>
				</Affix>
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
		name: state.profile.name,
		mongoDBUserId: state.auth.mongoDBUserId,
		conversationId: state.contacts.conversationId,
		selectedContactOnline: state.contacts.selectedContactOnline,
		selectedContactSocketId: state.contacts.selectedContactSocketId,
		selectedContactMongoDBUserId: state.contacts.selectedContactMongoDBUserId,
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
			selectedContactMongoDBUserId,
			name,
			mongoDBUserId,
			currentMessage
		) => {
			chatDispatchers.sendMessageToServer(
				conversationId,
				selectedContactOnline,
				selectedContactSocketId,
				selectedContactMongoDBUserId,
				name,
				mongoDBUserId,
				currentMessage
			);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
