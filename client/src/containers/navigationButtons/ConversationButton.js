import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "antd";

class ConversationButton extends Component {
	render() {
		const { colorTheme, totalNumberOfUnseenMessages } = this.props;

		return (
			<button
				style={{
					borderBottom:
						"3px solid " + colorTheme.conversationsButtonColor
				}}
			>
				<Badge
					count={totalNumberOfUnseenMessages}
					style={{
						backgroundColor: colorTheme.keyText8Color,
						color: colorTheme.text5Color,
						boxShadow: "0 0 0 1px " + colorTheme.keyText8Color,
						fontFamily: "Lucida Grande",
						fontSize: "12px",
						top: "-20px",
						right: "-30px"
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
				</Badge>
			</button>
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
