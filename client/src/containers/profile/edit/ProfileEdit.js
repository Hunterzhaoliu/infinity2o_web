import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as profileActionCreators from '../../../actions/profile';
import { bindActionCreators } from 'redux';
import InputField from './InputField';
import InputFieldNumber from './InputFieldNumber';
import InputFieldSelect from './interests/InputFieldSelect';
import InputSchedule from './availability/InputSchedule';
import InputTimeZone from './timeZone/InputTimeZone';
import { Layout, Row, Col, Button } from 'antd';
const { Content } = Layout;

class ProfileEdit extends Component {
	isSaveDisabled(profile) {
		if (
			profile.hasNameError ||
			profile.hasAgeError ||
			profile.hasInterestsError ||
			profile.hasTimeZoneError
		) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		//console.log('this.props in ProfileEdit.js', this.props);
		const { colorTheme, saveProfile, profile } = this.props;
		return (
			<Content
				style={{
					padding: '10% 7% 0%', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputField width={280} label="Name:" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputFieldNumber width={48} label="Age:" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputFieldSelect width={280} label="Interest(s):" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputTimeZone width={280} label="Time Zone:" />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<InputSchedule />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
							type="submit"
							disabled={this.isSaveDisabled(profile)}
							onClick={() => saveProfile(profile)}
						>
							Save
						</Button>
					</Col>
				</Row>
			</Content>
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

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		saveProfile: values => {
			profileDispatchers.saveProfile(values);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
