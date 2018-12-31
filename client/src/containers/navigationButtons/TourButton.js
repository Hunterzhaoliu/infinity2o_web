import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class TourButton extends Component {
	renderTourButton() {
		const { colorTheme } = this.props;

		return (
			<Button
				style={{
					fontSize: 17,
					borderColor: colorTheme.tourButtonColor,
					background: colorTheme.tourButtonColor,
					color: colorTheme.tourButtonTextColor,
					padding: "0px 0px 0px 0px",
					width: 34
				}}
			>
				<a href="/tour">
					<img
						alt=""
						style={{ width: 22, padding: "0px 0px 1px 0px" }}
						src="https://user-images.githubusercontent.com/24757872/40939951-cffbddd0-680b-11e8-870f-21ab81eabc02.png"
					/>
				</a>
			</Button>
		);
	}

	render() {
		return (
			<Col
				style={{ padding: "2px 0px 0px" }}
				md={{ offset: 1 }}
				lg={{ offset: 3 }}
				xl={{ offset: 2 }}
				key="1"
			>
				{this.renderTourButton()}
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
		colorThemeSave: state.profile.colorThemeSave
	};
}

export default connect(
	mapStateToProps,
	null
)(TourButton);
