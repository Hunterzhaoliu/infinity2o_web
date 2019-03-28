import React, { Component } from "react";
import * as profileActionCreators from "../../../../actions/profile/profile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Cascader } from "antd";
import timeZones from "./timeZones";
import ErrorMessage from "../ErrorMessage";
import "./InputTimeZone.css";

class InputTimeZone extends Component {
	onChangeTimeZone = e => {
		this.props.onChangeTimeZone(e);
	};

	render() {
		const { colorTheme, profile } = this.props;
		document.documentElement.style.setProperty(
			`--text1Color`,
			colorTheme.text1Color
		);
		document.documentElement.style.setProperty(
			`--text2Color`,
			colorTheme.text2Color
		);
		document.documentElement.style.setProperty(
			`--text4Color`,
			colorTheme.text4Color
		);
		document.documentElement.style.setProperty(
			`--text6Color`,
			colorTheme.text6Color
		);
		document.documentElement.style.setProperty(
			`--text7Color`,
			colorTheme.text7Color
		);
		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col xl={{ span: 2 }}>
						<h3
							style={{
								color: colorTheme.text4Color
							}}
						>
							Time Zone:
						</h3>
					</Col>
					<Col xl={{ span: 19, offset: 1 }}>
						<Cascader
							style={{
								background: colorTheme.text8Color
							}}
							value={profile.timeZone}
							onChange={this.onChangeTimeZone}
							options={timeZones}
							expandTrigger="hover"
							allowClear={false}
							placeholder=""
						/>
					</Col>
				</Row>
				<ErrorMessage
					message="Need a time zone instead of a country"
					hasError={profile.hasTimeZoneError}
				/>
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

function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		onChangeTimeZone: newTimeZone => {
			profileDispatchers.onChangeTimeZone(newTimeZone);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InputTimeZone);
