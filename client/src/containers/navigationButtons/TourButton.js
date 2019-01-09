import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class TourButton extends Component {
	renderTourButton() {
		const { colorTheme } = this.props;

		return (
			<Button
				style={{
					borderColor: colorTheme.tourButtonColor,
					background: colorTheme.tourButtonColor,
					color: colorTheme.tourButtonTextColor,
					padding: "0px 10px 0px"
				}}
			>
				<a href="/tour">
					<img
						alt=""
						style={{ width: 22 }}
						src="https://user-images.githubusercontent.com/24757872/40939951-cffbddd0-680b-11e8-870f-21ab81eabc02.png"
					/>
				</a>
			</Button>
		);
	}

	render() {
		return (
			<Col
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
