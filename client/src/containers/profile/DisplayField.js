import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_2 } from "../styles/ColorConstants";
import { Row, Col } from "antd";

class DisplayField extends Component {
	renderValue(label, value) {
		const { colorTheme } = this.props;
		if (
			label === "Name: " ||
			label === "E-mail: " ||
			label === "Age: " ||
			label === "Time Zone: "
		) {
			if (
				value === null ||
				value === undefined ||
				typeof value === "string" ||
				typeof value === "number"
			) {
				return value;
			}
		} else if (label === "Interest(s): ") {
			// value = profile.interests
			let formattedInterests = "";
			let upperCaseInterest = "";
			for (let i = 0; i < value.length; i++) {
				upperCaseInterest =
					value[i][0].toUpperCase() + value[i].substring(1);
				// replaces underscore in two word interests with space
				upperCaseInterest = upperCaseInterest.replace(/_/g, " ");
				const spaceIndex = upperCaseInterest.indexOf(" ");
				if (spaceIndex !== -1) {
					const secondWordFirstLetterIndex = spaceIndex + 1;
					upperCaseInterest =
						upperCaseInterest.substr(
							0,
							secondWordFirstLetterIndex
						) +
						upperCaseInterest[
							secondWordFirstLetterIndex
						].toUpperCase() +
						upperCaseInterest.substr(
							secondWordFirstLetterIndex + 1
						);
				}

				formattedInterests += upperCaseInterest;
				// adds comma between interests
				if (value.length === 2 && i === 0) {
					formattedInterests += " & ";
				} else if (i !== value.length - 1) {
					formattedInterests += ", ";
					if (i === value.length - 2) {
						formattedInterests += "& ";
					}
				}
			}
			return formattedInterests;
		}
	}

	render() {
		const { colorTheme, label, value, loggedInState } = this.props;

		let textColor = colorTheme.text2Color;
		if (loggedInState === "not_logged_in") {
			textColor = GREY_2;
		}
		return (
			<Row type="flex" justify="start" align="middle">
				<Col
					sm={{ span: 18 }}
					md={{ span: 19 }}
					lg={{ span: 20 }}
					xl={{ span: 21 }}
				>
					<h3
						style={{
							color: textColor
						}}
					>
						{this.renderValue(label, value)}
					</h3>
				</Col>
			</Row>
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
		infinityStatus: state.profile.payment.infinityStatus,
		loggedInState: state.auth.loggedInState
	};
}

export default connect(
	mapStateToProps,
	null
)(DisplayField);
