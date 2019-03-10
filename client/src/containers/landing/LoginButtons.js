import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_9, BLUE_3, RED_ORANGE_3 } from "../styles/ColorConstants";
import { Row, Col, Icon } from "antd";
import "./login-buttons.css";

class LoginButtons extends Component {
	render() {
		const { windowWidth } = this.props;

		document.documentElement.style.setProperty(`--BLUE_3`, BLUE_3);
		document.documentElement.style.setProperty(
			`--RED_ORANGE_3`,
			RED_ORANGE_3
		);

		let largeGmailLoginText = "Google Login ";
		let largeLinkedInLoginText = "LinkedIn Login ";
		let paddingBetweenLoginButtons = "0px 0px 0px 30px";
		let buttonPadding = "0px 30px 0px 0px";
		let smallLoginText = "";

		if (windowWidth < 768) {
			// less than medium screen, need to change where the infinity2o logo
			// is and adjust text size
			largeGmailLoginText = "";
			largeLinkedInLoginText = "";
			smallLoginText = " Login";
			paddingBetweenLoginButtons = "0px 0px 0px 10px";
			buttonPadding = "0px 15px 0px 0px";
		}

		return (
			<div>
				<Col>
					<button className="google-login-button">
						<a href="/auth/google">
							Gmail Login{" "}
							<Icon style={{ fontSize: 18 }} type="google" />
						</a>
					</button>
				</Col>
				<Col>
					<button className="linkedIn-login-button">
						<a href="/auth/linkedIn">
							LinkedIn Login{" "}
							<Icon style={{ fontSize: 18 }} type="linkedin" />
						</a>
					</button>
				</Col>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		windowWidth: state.customHeader.windowWidth
	};
}

export default connect(
	mapStateToProps,
	null
)(LoginButtons);
