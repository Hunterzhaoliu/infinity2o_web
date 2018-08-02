import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import ContactCard from "./ContactCard";
import Chat from "./Chat";
import Contacts from "./Contacts";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;

class Conversation extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onConversations();
		this.props.fetchConversations();
	}

	renderConversations() {
		const { colorTheme, contacts } = this.props;

		if (
			contacts.allContacts !== undefined &&
			contacts.allContacts.length >= 1
		) {
			return (
				<Row type="flex" justify="center" align="middle">
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
						style={{
							padding: "0px 5px 0px"
						}}
					>
						<ContactCard />
					</Col>
					<Col
						sm={{ span: 6 }}
						md={{ span: 6 }}
						lg={{ span: 3 }}
						xl={{ span: 3 }}
						style={{
							color: colorTheme.text3Color
						}}
					>
						<Contacts />
					</Col>
					<Col
						sm={{ span: 18 }}
						md={{ span: 18 }}
						lg={{ span: 9 }}
						xl={{ span: 9 }}
						style={{
							padding: "5px 0px 0px 5px"
						}}
					>
						<Chat />
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
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
		const { colorTheme } = this.props;

		return (
			<Content
				style={{
					textAlign: "center",
					padding: "75px 0px 0px 0px",
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
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
