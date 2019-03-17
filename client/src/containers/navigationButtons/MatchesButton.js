import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge } from "antd";
import "./general-header-button.css";

class MatchesButton extends Component {
	render() {
		const { colorTheme, numberOfUnseenMatches } = this.props;

		return (
			<a className="header-anchor" href="/matches">
				<button
					className="general-header-button"
					style={{
						boxShadow:
							"0px -3px 0px 0px " +
							colorTheme.matchesButtonColor +
							" inset"
					}}
				>
					<Badge
						count={numberOfUnseenMatches}
						style={{
							backgroundColor: colorTheme.keyText8Color,
							color: colorTheme.text5Color,
							boxShadow: "0 0 0 1px " + colorTheme.keyText8Color,
							fontFamily: "Overpass",
							fontSize: "12px",
							top: "-20px", // starts at the top of "s" in matches
							right: "-30px" // starts in the middle of the wod "matches"
						}}
					>
						<div
							className="header-badge-div"
							style={{
								color: colorTheme.matchesButtonTextColor
							}}
						>
							Matches
						</div>
					</Badge>
				</button>
			</a>
		);
	}
}

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
