import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "antd";

class MatchesButton extends Component {
	render() {
		const { colorTheme, numberOfUnseenMatches } = this.props;

		return (
			<button
				style={{
					borderBottom: "3px solid " + colorTheme.matchesButtonColor
				}}
			>
				<Badge
					count={numberOfUnseenMatches}
					style={{
						backgroundColor: colorTheme.keyText8Color,
						color: colorTheme.text5Color,
						boxShadow: "0 0 0 1px " + colorTheme.keyText8Color,
						fontFamily: "Lucida Grande",
						fontSize: "12px",
						top: "-20px", // starts at the top of "s" in matches
						right: "-30px" // starts in the middle of the wod "matches"
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
		numberOfUnseenMatches: state.matches.numberOfUnseenMatches
	};
}

export default connect(
	mapStateToProps,
	null
)(MatchesButton);
