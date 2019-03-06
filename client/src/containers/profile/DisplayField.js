import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_2 } from "../styles/ColorConstants";
import { Row, Col } from "antd";

class DisplayField extends Component {
	render() {
		const { colorTheme, value, loggedInState } = this.props;

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
						value
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
		loggedInState: state.auth.loggedInState
	};
}

export default connect(
	mapStateToProps,
	null
)(DisplayField);
