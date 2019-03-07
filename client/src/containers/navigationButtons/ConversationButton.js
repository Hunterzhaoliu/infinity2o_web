import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Badge } from "antd";
import "./general-header-button.css";

class ConversationButton extends Component {
	renderConversationsButton() {
		const { colorTheme, totalNumberOfUnseenMessages } = this.props;

		return (
			<Badge
				count={totalNumberOfUnseenMessages}
				style={{
					backgroundColor: colorTheme.keyText8Color,
					color: colorTheme.text2Color,
					boxShadow: "0 0 0 1px " + colorTheme.keyText8Color,
					fontFamily: "Lucida Grande"
				}}
			>
				<button
					style={{
						borderBottom:
							"3px solid " + colorTheme.conversationsButtonColor
					}}
				>
					<a
						style={{
							color: colorTheme.conversationsButtonColor
						}}
						href="/conversations"
					>
						Conversations
					</a>
				</button>
			</Badge>
		);
	}

	render() {
		return (
			<Col
				md={{ offset: 1 }}
				lg={{ offset: 1 }}
				xl={{ offset: 1 }}
				key="5"
			>
				{this.renderConversationsButton()}
			</Col>
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
		totalNumberOfUnseenMessages: state.contacts.totalNumberOfUnseenMessages
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/

export default connect(
	mapStateToProps,
	null
)(ConversationButton);
