import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';
import InputFieldNumber from './InputFieldNumber';
import InputFieldSelect from './InputFieldSelect';
import InputSchedule from './InputSchedule';
import InputTimeZone from './InputTimeZone';
import {
	isValidName,
	isValidAge,
	isValidInterests
} from '../../../utils/validate';
import { Layout, Row, Form, Col, Button } from 'antd';
const { Content } = Layout;

class ProfileForm extends Component {
	render() {
		// console.log('this.props in ProfileForm.js', this.props);

		return (
			<Content
				style={{
					padding: '5% 0% 0%', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<Form onSubmit={this.props.handleSubmit}>
					<Row
						type="flex"
						justify="start"
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
								type="text"
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
							<Field name="schedule" component={InputSchedule} />
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
									borderColor: this.props.colorTheme.key,
									background: this.props.colorTheme.key,
									color: this.props.colorTheme.text1Color
								}}
							>
								Submit
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
		colorTheme: state.colorTheme
	};
}

ProfileForm = connect(mapStateToProps, null)(ProfileForm);

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
		errors['time_zone'] = 'Need a time zone';
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'profile' // state.form.profile
})(ProfileForm);
