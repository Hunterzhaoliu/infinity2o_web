import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_9, BLUE_3, RED_ORANGE_3 } from "../styles/ColorConstants";
import { Button, Row, Col, Icon } from "antd";

class LoginButtons extends Component {
	render() {
		const { windowWidth } = this.props;

		let buttonSize = "large";
		let buttonPadding = "0px 30px 0px 0px";

		if (windowWidth < 768) {
			buttonSize = "medium";
			buttonPadding = "0px 15px 0px 0px";
		}

		return (
			<Row type="flex" justify="center">
				<Col
					style={{
						padding: buttonPadding
					}}
				>
					<Button
						size={buttonSize}
						key="-1"
						style={{
							borderColor: RED_ORANGE_3,
							background: RED_ORANGE_3,
							color: GREY_9,
							fontFamily: "Lucida Grande"
						}}
					>
						<a href="/auth/google">
							Gmail Login{" "}
							<Icon style={{ fontSize: 18 }} type="google" />
						</a>
					</Button>
				</Col>
				<Col>
					<Button
						size={buttonSize}
						key="0"
						style={{
							borderColor: BLUE_3,
							background: BLUE_3,
							color: GREY_9,
							fontFamily: "Lucida Grande"
						}}
					>
						<a href="/auth/linkedIn">
							LinkedIn Login{" "}
							<Icon style={{ fontSize: 18 }} type="linkedin" />
						</a>
					</Button>
				</Col>
			</Row>
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
