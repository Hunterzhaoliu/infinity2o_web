import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as profileActionCreators from '../../actions/profile';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import InputField from './InputField';
import InputFieldNumber from './InputFieldNumber';
import InputFieldSelect from './interestsSelect/InputFieldSelect';
import InputSchedule from './scheduleDropdowns/InputSchedule';
import InputTimeZone from './timeZone/InputTimeZone';
import {
	isValidName,
	isValidAge,
	isValidInterests,
	isValidTimeSlots
} from '../../utils/validate';
import { Layout, Row, Form, Col, Button } from 'antd';
const { Content } = Layout;

class ProfileEdit extends Component {
	isSaveDisabled(newProfile) {
		if (newProfile === undefined) {
			return true;
		} else {
			const numProfileFieldsFilled = Object.keys(newProfile).length;
			const allFieldsFilled = numProfileFieldsFilled === 5;
			if (!allFieldsFilled) {
				return true;
			} else {
				return false;
			}
		}
	}

	render() {
		console.log('this.props in ProfileEdit.js', this.props);
		const {
			colorTheme,
			handleSubmit,
			saveProfile,
			newProfile,
			profile
		} = this.props;
		return (
			<Content
				style={{
					padding: '10% 7% 0%', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Form onSubmit={handleSubmit}>
					<Row
						type="flex"
						justify="start"
						align="middle"
						style={{
							padding: '3% 0% 0%' // top left&right bottom
						}}
					>
						<Col span={24}>
							<Field
								defaultValue={profile.name}
								name="name"
								label="Name:"
								width={280}
								component={InputField}
								type="text"
							/>
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
							<Field
								defaultValue={profile.age}
								name="age"
								label="Age:"
								width={50}
								component={InputFieldNumber}
								type="text"
							/>
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
							<Field
								name="interests"
								label="Interest(s):"
								placeholder="Select up to 5 interests!"
								width={280}
								component={InputFieldSelect}
							/>
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
							<Field
								name="time_zone"
								label="Time Zone:"
								width={280}
								component={InputTimeZone}
							/>
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
							<Field name="input_schedule" component={InputSchedule} />
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
								disabled={this.isSaveDisabled(newProfile)}
								onClick={() => saveProfile(newProfile)}
							>
								Save
							</Button>
						</Col>
					</Row>
				</Form>
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
		newProfile: state.form.profile.values,
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

ProfileEdit = connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

function validate(values) {
	const errors = {};

	if (!isValidName(values.name)) {
		errors['name'] = 'Cool name! But we need 1 to 30 valid letters';
	}

	if (!isValidAge(values.age)) {
		errors['age'] = 'Between 13 & 125. If your close you should lie ;)';
	}

	if (!isValidInterests(values.interests)) {
		errors['interests'] = '1 to 5 interests pretty please';
	}

	if (
		values.time_zone === 'europe' ||
		values.time_zone === 'canada' ||
		values.time_zone === 'united_states'
	) {
		errors['time_zone'] = 'Need a time zone instead of a country silly';
	}

	if (!isValidTimeSlots(values.dayDropdowns)) {
		errors['input_schedule'] = 'Need at least 2 time slots';
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'profile', // state.form.profile
	destroyOnUnmount: false
})(ProfileEdit);
