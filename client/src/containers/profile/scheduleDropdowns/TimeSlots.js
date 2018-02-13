import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Menu, Checkbox } from 'antd';
import { isValidTimeSlots } from '../../../utils/validate';

class TimeSlots extends Component {
	renderCheckbox = ({ input, timeSlot, meta }) => {
		return (
			<Checkbox.Group onChange={input.onChange}>
				<Row key={timeSlot.key}>
					<Col span={24}>
						<Checkbox value={timeSlot.key}>
							{timeSlot.label}
						</Checkbox>
					</Col>
				</Row>
			</Checkbox.Group>
		);
	};

	renderTimeSlot(timeSlot) {
		return (
			<Field
				name={timeSlot.key}
				timeSlot={timeSlot}
				component={this.renderCheckbox}
			/>
		);
	}

	renderTimeSlots(timeSlots) {
		return _.map(timeSlots, timeSlot => {
			return (
				<Menu.Item key={timeSlot.key}>
					{this.renderTimeSlot(timeSlot)}
				</Menu.Item>
			);
		});
	}

	render() {
		console.log('this.props in TimeSlots', this.props);
		console.log('this.props.meta = ', this.props.meta);
		const { day } = this.props;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Menu>{this.renderTimeSlots(day.timeSlots)}</Menu>
					</Col>
				</Row>
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
		colorTheme: state.colorTheme
	};
}

TimeSlots = connect(mapStateToProps, null)(TimeSlots);

function validate(values) {
	const errors = {};

	if (!isValidTimeSlots(values)) {
		errors['timeSlots'] = 'Need at least 2 time slots your usually free';
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'profile.values.timeSlots'
})(TimeSlots);
