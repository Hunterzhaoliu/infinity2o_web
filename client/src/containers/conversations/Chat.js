import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as chatActionCreators from '../../actions/chat';
import { bindActionCreators } from 'redux';
import './Chat.css';
import InfiniteScroll from 'react-infinite-scroller';

import { Layout, Input, Row, Col, Affix, Icon, List, Spin } from 'antd';
const { Content } = Layout;

class Chat extends Component {
	componentWillMount() {
		// run once before first render()
	}

	handleInfiniteOnLoad = () => {
		const {
			chat,
			setLoading,
			setHasMore,
			displayMoreMessages
		} = this.props;

		setLoading(true);
		if (chat.displayedMessages.length === chat.last50Messages.length) {
			setLoading(false);
			setHasMore(false);
			return;
		}
		displayMoreMessages(5);
		setLoading(false);
	};

	onChangeTypedMessage = e => {
		// console.log('e.target.value = ', e.target.value);
		this.props.onChangeTypedMessage(e.target.value);
	};

	onPressEnter = () => {
		console.log('pressed enter');
		this.props.sendMessageToServer();
	};

	renderMessageStatusIcon(status) {
		if (status === 'sending') {
			return <Icon type="loading" />;
		} else if (status === 'sent') {
			return <Icon type="check-circle-o" />;
		} else if (status === 'delivered') {
			return <Icon type="check-circle" />;
		} else if (status === 'failed') {
			return <Icon type="warning" />;
		}
	}

	render() {
		//console.log('Chat this.props = ', this.props);
		const { colorTheme, chat } = this.props;

		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '0px 0px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<div className="chat-window-infinite-container">
					<InfiniteScroll
						initialLoad={false}
						loadMore={this.handleInfiniteOnLoad}
						hasMore={!chat.loading && chat.hasMore}
						useWindow={false}
					>
						<List
							dataSource={chat.displayMessages}
							renderItem={item => {
								const nameAndMessage =
									item.senderName + ': ' + item.contents;
								let justifyValue = 'start';
								// TODO: replace 'Hunter' with the user1's name
								if (item.senderName === 'Hunter') {
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
													color:
														colorTheme.text8Color,
													padding: '12px 4px 0px'
												}}
											>
												{this.renderMessageStatusIcon(
													'delivered'
												)}
											</p>
										</Col>
									</Row>
								);
							}}
						>
							{chat.loading &&
								chat.hasMore && (
									<Spin className="chat-window-loading" />
								)}
						</List>
					</InfiniteScroll>
				</div>
				<Row type="flex" justify="start" align="middle">
					<Col>
						<Affix offsetBottom={0}>
							<Input
								value={chat.typedMessage}
								placeholder="type here..."
								onChange={this.onChangeTypedMessage}
								onPressEnter={this.onPressEnter}
								style={{
									width: 555,
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
		chat: state.chat
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
		onChangeTypedMessage: newMessage => {
			chatDispatchers.onChangeTypedMessage(newMessage);
		},
		setLoading: loading => {
			chatDispatchers.setLoading(loading);
		},
		setHasMore: hasMore => {
			chatDispatchers.setHasMore(hasMore);
		},
		displayMoreMessages: numberOfMessages => {
			chatDispatchers.displayMoreMessages(numberOfMessages);
		},
		sendMessageToServer: () => {
			chatDispatchers.sendMessageToServer();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
