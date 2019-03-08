import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Col } from "antd";
import "./general-header-button.css";

class MatchesButton extends Component {
	render() {
		const { colorTheme, numberOfUnseenMatches } = this.props;

		return (
			<Col style={{ padding: "0px 0px 0px 10px" }}>
				<a href="/matches">
					<button
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
								boxShadow:
									"0 0 0 1px " + colorTheme.keyText8Color,
								fontFamily: "Lucida Grande",
								fontSize: "12px",
								top: "-20px", // starts at the top of "s" in matches
								right: "-30px" // starts in the middle of the wod "matches"
							}}
						>
							<div
								style={{
									color: colorTheme.matchesButtonColor
								}}
							>
								Matches
							</div>
						</Badge>
					</button>
				</a>
			</Col>
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
