import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "antd";
import "./general-header-button.css";

class MatchesButton extends Component {
	render() {
		const { colorTheme, numberOfUnseenMatches } = this.props;

		return (
			<Badge
				count={numberOfUnseenMatches}
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
							"3px solid " + colorTheme.matchesButtonColor
					}}
				>
					<a
						style={{
							color: colorTheme.matchesButtonColor
						}}
						href="/matches"
					>
						Matches
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
		numberOfUnseenMatches: state.matches.numberOfUnseenMatches
	};
}

export default connect(
	mapStateToProps,
	null
)(MatchesButton);
