import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "antd";
import "./general-header-button.css";

class ConversationButton extends Component {
	render() {
		const { colorTheme, totalNumberOfUnseenMessages } = this.props;

		return (
			<a className="header-anchor" href="/conversations">
				<button
					className="general-header-button"
					style={{
						boxShadow:
							"0px -3px 0px 0px " +
							colorTheme.conversationsButtonColor +
							" inset"
					}}
				>
					<Badge
						count={totalNumberOfUnseenMessages}
						style={{
							backgroundColor: colorTheme.keyText8Color,
							color: colorTheme.text5Color,
							boxShadow: "0 0 0 1px " + colorTheme.keyText8Color,
							fontFamily: "Overpass",
							fontSize: "12px",
							top: "-20px",
							right: "-30px"
						}}
					>
						<div
							className="header-badge-div"
							style={{
								color: colorTheme.conversationsButtonTextColor
							}}
						>
							Conversations
						</div>
					</Badge>
				</button>
			</a>
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
