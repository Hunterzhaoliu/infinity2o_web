import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

class ErrorMessage extends Component {
	renderMessage(hasError, message) {
		if (hasError) {
			return message;
		} else {
			return;
		}
	}
	render() {
		const { colorTheme, message, hasError } = this.props;
		return (
			<Row
				style={{ padding: "5px 0px 0px 0px" }}
				type="flex"
				justify="start"
				align="middle"
			>
				<Col>
					<div
						style={{
							color: colorTheme.keyText1Color,
							lineHeight: 1,
							fontFamily: "Overpass",
							marginBottom: 0,
							fontSize: "14px",
							height: "14px"
						}}
					>
						{this.renderMessage(hasError, message)}
					</div>
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
		colorTheme: state.colorTheme
	};
}

export default connect(
	mapStateToProps,
	null
)(ErrorMessage);
