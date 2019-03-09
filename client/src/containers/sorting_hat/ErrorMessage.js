import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

class ErrorMessage extends Component {
	render() {
		const { colorTheme, message, hasError } = this.props;
		if (hasError) {
			return (
				<Row
					style={{ padding: "5px 0px 0px 0px" }}
					type="flex"
					justify="start"
					align="middle"
				>
					<Col xl={{ offset: 4 }}>
						<div
							style={{
								color: colorTheme.text3Color
							}}
						>
							{message}
						</div>
					</Col>
				</Row>
			);
		} else {
			return <div />;
		}
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
