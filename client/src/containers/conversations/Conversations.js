import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as contactsActionCreators from '../../actions/conversations/contacts';
import { bindActionCreators } from 'redux';

import Chat from './Chat';
import Contacts from './Contacts';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class Conversation extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onConversations();
		this.props.updateOnlineStatus();
		this.props.fetchConversations();
	}

	renderConversations() {
		const { colorTheme, chat, contacts } = this.props;

		if (
			contacts.allContacts !== undefined &&
			contacts.allContacts.length >= 1
		) {
			return (
				<Row type="flex" justify="space-between">
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					/>
					<Col
						sm={{ span: 6 }}
						md={{ span: 6 }}
						lg={{ span: 4 }}
						xl={{ span: 4 }}
						style={{
							color: colorTheme.text3Color
						}}
					>
						<Contacts contacts={contacts.allContacts} />
					</Col>
					<Col
						sm={{ span: 18 }}
						md={{ span: 18 }}
						lg={{ span: 10 }}
						xl={{ span: 10 }}
					>
						<Chat chat={chat} />
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					/>
				</Row>
			);
		} else {
			return (
				<h2
					style={{
						color: colorTheme.text2Color
					}}
				>
					You have no conversations right now. Start one in Matches.
				</h2>
			);
		}
	}

	render() {
		console.log('Conversation this.props = ', this.props);
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
		contacts: state.contacts
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
		onConversations: () => {
			colorThemeDispatchers.onConversations();
		},
		fetchConversations: () => {
			contactsDispatchers.fetchConversations();
		},
		updateOnlineStatus: () => {
			contactsDispatchers.updateOnlineStatus();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
