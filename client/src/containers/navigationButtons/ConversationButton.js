import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "antd";
import "./general-header-button.css";

class ConversationButton extends Component {
	render() {
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
