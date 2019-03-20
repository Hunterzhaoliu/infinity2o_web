import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import ErrorMessage from "./ErrorMessage";
import "./input-field.css";

class InputField extends Component {
	onModify = e => {
		const { onChange } = this.props;
		onChange(e.target.value);
	};

	render() {
		const { value, colorTheme, label, errorMessage, hasError } = this.props;

		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col>
						<h4
							style={{
								color: colorTheme.text4Color,
								fontFamily: "Overpass",
								lineHeight: 1,
								marginBottom: 0,
								fontSize: "20px"
							}}
						>
							{label}
						</h4>
					</Col>
					<Col style={{ padding: "0px 0px 0px 30px" }}>
						<input
							className="input-field-input"
							value={value}
							onChange={this.onModify}
							style={{
								color: colorTheme.text2Color,
								borderColor: colorTheme.text8Color,
								backgroundColor: colorTheme.text8Color
							}}
						/>
					</Col>
				</Row>
				<ErrorMessage message={errorMessage} hasError={hasError} />
			</div>
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
		profile: state.profile
	};
}

export default connect(
	mapStateToProps,
	null
)(InputField);
