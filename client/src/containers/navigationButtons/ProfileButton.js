import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class ProfileButton extends Component {
	renderProfileButton() {
		const { colorTheme, neuronsInBillions, infinityStatus } = this.props;
		let shortNeuronsInBillions;
		if (neuronsInBillions !== undefined) {
			shortNeuronsInBillions = neuronsInBillions.toFixed(1);
		}
		let displayText = " " + shortNeuronsInBillions + " B";
		if (infinityStatus) {
			displayText = " ∞";
		}
		return (
			<Button
				style={{
					borderColor: colorTheme.profileButtonColor,
					background: colorTheme.profileButtonColor,
					color: colorTheme.profileButtonTextColor,
					fontFamily: "Lucida Grande"
				}}
			>
				<a href="/profile">
					<img
						alt=""
						style={{ width: 20 }}
						src="https://user-images.githubusercontent.com/24757872/40881386-00fbc094-668b-11e8-96ca-47c0a9fafd56.png"
					/>
					{displayText}
				</a>
			</Button>
		);
	}

	render() {
		return (
			<Col
				md={{ offset: 1 }}
				lg={{ offset: 1 }}
				xl={{ offset: 1 }}
				key="2"
			>
				{this.renderProfileButton()}
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
		neuronsInBillions: state.profile.payment.neuronsInBillions,
		infinityStatus: state.profile.payment.infinityStatus
	};
}

export default connect(
	mapStateToProps,
	null
)(ProfileButton);
