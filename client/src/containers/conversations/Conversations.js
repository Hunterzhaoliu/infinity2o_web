import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as conversationsActionCreators from '../../actions/conversations';
import { bindActionCreators } from 'redux';

import Chat from './Chat';
import Contacts from './Contacts';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class Conversation extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onPressConversations();
		this.props.fetchConversations();
	}

	renderConversations() {
		const { colorTheme, chat, conversations } = this.props;

		if (conversations.contacts.length >= 1) {
			return (
				<Row type="flex" justify="space-between">
					<Col md={{ span: 5 }} />
					<Col
						md={{ span: 4 }}
						style={{
							color: colorTheme.text3Color
						}}
					>
						<Contacts contacts={conversations.contacts} />
					</Col>
					<Col md={{ span: 10 }}>
						<Chat chat={chat} />
					</Col>
					<Col md={{ span: 5 }} />
				</Row>
			);
		} else {
			return (
				<h2
					style={{
						color: colorTheme.text3Color
					}}
				>
					You have no conversations right now. Start some by "Saying
					Hi" in Matches.
				</h2>
			);
		}
	}

	render() {
		//console.log('Conversation this.props = ', this.props);
		const { colorTheme } = this.props;

		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				{this.renderConversations()}
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
		conversations: state.conversations
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

	const conversationsDispatchers = bindActionCreators(
		conversationsActionCreators,
		dispatch
	);

	return {
		onPressConversations: () => {
			colorThemeDispatchers.onPressConversations();
		},
		fetchConversations: () => {
			conversationsDispatchers.fetchConversations();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
