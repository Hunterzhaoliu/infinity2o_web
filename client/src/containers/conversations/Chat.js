import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as chatActionCreators from '../../actions/conversations/chat';
import * as authActionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import './Chat.css';

import { Layout, Input, Row, Col, Affix, Icon, List } from 'antd';
const { Content } = Layout;

class Chat extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserProfile();
	}

	onChangeCurrentMessage = e => {
		// console.log('e.target.value = ', e.target.value);
		this.props.onChangeCurrentMessage(e.target.value);
	};

	onPressEnter = () => {
		console.log('pressed enter');
		const {
			name,
			conversationId,
			chat,
			selectedContactOnline,
			selectedContactSocketId
		} = this.props;
		this.props.sendMessageToServer(
			conversationId,
			selectedContactOnline,
			selectedContactSocketId,
			name,
			chat.currentMessage
		);
	};

	renderMessageStatusIcon(status, item, name) {
		if (item.senderName === name) {
			if (status === 'sending') {
				return <Icon type="loading" />;
			} else if (status === 'sent') {
				return <Icon type="check-circle-o" />;
			} else if (status === 'delivered') {
				return <Icon type="check-circle" />;
			} else if (status === 'failed-delivery') {
				return <Icon type="warning" />;
			}
		} else {
			// no need to show if partner's message successfully reached us to us
		}
	}

	render() {
		//console.log('Chat this.props = ', this.props);
		const { colorTheme, chat, name, windowWidth } = this.props;
		// 0.3819 = 483.5/1200
		// 0.3745 = 371.6/992
		let inputWidth = windowWidth * 0.38; // = 483.5/1200
		if (windowWidth < 576) {
			// 0.815 = 470/576
			inputWidth = windowWidth * 0.815;
		} else if (windowWidth < 768) {
			// 0.6523 = 501/768
			inputWidth = windowWidth * 0.6523;
		} else if (windowWidth < 992) {
			// 0.6523 = 668.2/992
			inputWidth = windowWidth * 0.6735;
		}
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '0px 0px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<div className="chat-window-infinite-container">
					<List
						dataSource={chat.last50Messages}
						renderItem={item => {
							const nameAndMessage =
								item.senderName + ': ' + item.content;
							let justifyValue = 'start';
							if (item.senderName === name) {
								// TODO: what if both people's names are the senderName
								// need to switch to unique identifier
								justifyValue = 'end';
							}
							return (
								<Row
									type="flex"
									justify={justifyValue}
									align="middle"
									style={{
										padding: '0px 0px 0px'
									}}
								>
									<Col>
										<List.Item
											style={{
												padding: '0px 0px 0px'
											}}
										>
											<p
												style={{
													borderColor:
														colorTheme.text8Color,
													borderWidth: '2px',
													background:
														colorTheme.text8Color,
													color:
														colorTheme.text3Color,
													borderRadius: '25px',
													padding: '4px 15px 4px'
												}}
											>
												{nameAndMessage}
											</p>
										</List.Item>
									</Col>
									<Col xl={{ span: 1 }}>
										<p
											style={{
												color: colorTheme.text8Color,
												padding: '12px 4px 0px'
											}}
										>
											{this.renderMessageStatusIcon(
												'delivered',
												item,
												name
											)}
										</p>
									</Col>
								</Row>
							);
						}}
					/>
				</div>
				<Row type="flex" justify="start" align="middle">
					<Col>
						<Affix offsetBottom={0}>
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
						</Affix>
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
		name: state.profile.name,
		conversationId: state.contacts.conversationId,
		selectedContactOnline: state.contacts.selectedContactOnline,
		selectedContactSocketId: state.contacts.selectedContactSocketId,
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

	const chatDispatchers = bindActionCreators(chatActionCreators, dispatch);
	const authDispatchers = bindActionCreators(authActionCreators, dispatch);

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
			name,
			currentMessage
		) => {
			chatDispatchers.sendMessageToServer(
				conversationId,
				selectedContactOnline,
				selectedContactSocketId,
				name,
				currentMessage
			);
		},
		fetchUserProfile: () => {
			authDispatchers.fetchUserProfile();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
