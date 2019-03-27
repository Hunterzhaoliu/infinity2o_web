import React, { Component } from "react";
import * as profileActionCreators from "../../../actions/profile/profile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import ErrorMessage from "./ErrorMessage";
import "./input-field.css";

class InputFieldNumber extends Component {
	onChangeAge = e => {
		this.props.onChangeAge(e.target.value);
	};

	render() {
		const { colorTheme, label, width, profile } = this.props;
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col xl={{ span: 2 }}>
						<h3
							style={{
								color: colorTheme.text4Color
							}}
						>
							{label}
						</h3>
					</Col>
					<Col xl={{ span: 5, offset: 1 }}>
						<input
							className="input-field-input"
							value={profile.age}
							onChange={this.onChangeAge}
							style={{
								width: width,
								color: colorTheme.text2Color,
								borderColor: colorTheme.text8Color,
								backgroundColor: colorTheme.text8Color
							}}
						/>
					</Col>
				</Row>
				<ErrorMessage
					message="Between 13 & 125."
					hasError={profile.hasAgeError}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		saveProfile: values => {
			profileDispatchers.saveProfile(values);
		},
		onChangeAge: e => {
			profileDispatchers.onChangeAge(e);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InputFieldNumber);
