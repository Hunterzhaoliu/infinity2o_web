import _ from 'lodash';
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
import InputResume from './InputResume';
import daysOfWeek from './scheduleDropdowns/daysOfWeek';
import {
	isValidName,
	isValidAge,
	isValidInterests,
	isValidTimeSlots
} from '../../utils/validate';
import { Layout, Row, Form, Col, Button } from 'antd';
const { Content } = Layout;

class FormEdit extends Component {
	renderDaysOfWeekDropdowns() {
		return _.map(daysOfWeek, day => {
			return (
				<Col span={3} key={day.name}>
<<<<<<< HEAD
					<Field name="schedule" day={day} component={InputSchedule} />
=======
					<InputSchedule day={day} />
>>>>>>> profile-2
				</Col>
			);
		});
	}

	render() {
		console.log('this.props in FormEdit.js', this.props);
		const {
			colorTheme,
			handleSubmit,
			pristine,
			submitting,
			profileValues,
			saveProfile,
			history
		} = this.props;
		return (
			<Content
				style={{
					padding: '5% 0% 0%', // top left&right bottom
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
							<Row type="flex" justify="start" align="middle">
								<Col span={24}>
									<h3
										style={{
											color: this.props.colorTheme.keyText5Color
										}}
									>
<<<<<<< HEAD
										When are you free to video chat for your class?
									</h3>
								</Col>
							</Row>

							<Row type="flex" justify="space-around" align="middle">
								<Col span={24}>{this.renderDaysOfWeekDropdowns()}</Col>
=======
										When are you free to video chat for your
										class? (Min. 2 times on different days)
									</h3>
								</Col>
							</Row>
							<Row
								type="flex"
								justify="space-around"
								align="middle"
							>
								<Col span={24}>
									{this.renderDaysOfWeekDropdowns()}
								</Col>
>>>>>>> profile-2
							</Row>
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
							<Field
								name="resume"
								label="Resume: "
								width={280}
								component={InputResume}
							/>
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
								disabled={pristine || submitting}
								onClick={() => saveProfile(profileValues, history)}
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
		profileValues: state.form.profile.values
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
		saveProfile: () => {
			profileDispatchers.saveProfile();
		}
	};
}

FormEdit = connect(mapStateToProps, mapDispatchToProps)(FormEdit);

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

	if (values.time_zone === 'country') {
		errors['timeZone'] = 'Need a time zone instead of a country silly';
	}

	if (!isValidTimeSlots(values.dayDropdowns)) {
		errors['dayDropdowns'] =
			'Need at least 2 time slots from 2 different days';
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'profile' // state.form.profile
})(FormEdit);
