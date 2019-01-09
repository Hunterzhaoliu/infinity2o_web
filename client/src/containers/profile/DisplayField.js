import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_2 } from "../styles/ColorConstants";
import { Row, Col, Popover, Button, Icon } from "antd";
import "./DisplayField.css";

class DisplayField extends Component {
	numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	renderNeuronExplanation() {
		const { colorTheme } = this.props;
		document.documentElement.style.setProperty(
			`--text7Color`,
			colorTheme.text7Color
		);
		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);

		const neuronExplanation = (
			<div>
				<p
					style={{
						padding: "7px 0px 0px",
						color: colorTheme.text2Color
					}}
				>
					Use neurons to 'Say Hi' to more matches.
				</p>
			</div>
		);

		return (
			<Popover
				style={{
					borderColor: colorTheme.text8Color,
					backgroundColor: colorTheme.text8Color,
					color: colorTheme.text3Color
				}}
				content={neuronExplanation}
			>
				<Button
					style={{
						borderColor: colorTheme.text8Color,
						backgroundColor: colorTheme.text8Color,
						color: colorTheme.text3Color,
						padding: "0px 5px 0px"
					}}
					size="small"
				>
					<Icon
						style={{
							fontSize: 12,
							padding: "0px 0px 6px"
						}}
						type="question-circle-o"
					/>
				</Button>
			</Popover>
		);
	}

	renderValue(label, value) {
		const { colorTheme, infinityStatus } = this.props;
		document.documentElement.style.setProperty(
			`--backgroundColor`,
			colorTheme.backgroundColor
		);
		document.documentElement.style.setProperty(
			`--text3Color`,
			colorTheme.text3Color
		);
		document.documentElement.style.setProperty(
			`--text4Color`,
			colorTheme.text4Color
		);
		document.documentElement.style.setProperty(
			`--text7Color`,
			colorTheme.text7Color
		);
		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);

		if (
			label === "Neurons: " ||
			label === "Name: " ||
			label === "E-mail: " ||
			label === "Age: " ||
			label === "Time Zone: "
		) {
			if (label === "Neurons: " && infinityStatus) {
				return (
					<div>
						<Col>
							<p>"infinity"</p>
						</Col>
						<Col>{this.renderNeuronExplanation()}</Col>
					</div>
				);
			} else if (label === "Neurons: " && !infinityStatus) {
				let displayNeuronsInBillions = value;
				if (displayNeuronsInBillions !== undefined) {
					displayNeuronsInBillions *= 1000000000;
					let finalDisplayString =
						this.numberWithCommas(displayNeuronsInBillions) +
						" (" +
						value +
						") Billion Neurons";

					return (
						<Row type="flex" justify="start" align="middle">
							<Col style={{ padding: "25px 0px 0px" }}>
								<p>{finalDisplayString}</p>
							</Col>
							<Col offset={1} style={{ padding: "7px 0px 0px" }}>
								{this.renderNeuronExplanation()}
							</Col>
						</Row>
					);
				}
			} else if (
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
