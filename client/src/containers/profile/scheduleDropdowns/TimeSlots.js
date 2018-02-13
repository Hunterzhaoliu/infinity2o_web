import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { isValidTimeSlots } from '../../../utils/validate';
import { Row, Col, Menu, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const timeSlotOptions = [
	'6-8 AM',
	'8-10 AM',
	'10-12 noon',
	'12-2 PM',
	'2-4 PM',
	'4-6 PM',
	'6-8 PM',
	'8-10 PM',
	'10-12 midnight'
];

class TimeSlots extends Component {
	renderCheckboxs = ({ input, timeSlots }) => {
		return (
			<CheckboxGroup
				options={timeSlotOptions}
				onChange={input.onChange}
				value={input.value || []}
			/>
		);
	};

	renderTimeSlots(day) {
		return (
			<Field
				name={'dayDropdowns.' + day.value}
				timeSlots={day.timeSlots}
				component={this.renderCheckboxs}
			/>
		);
	}

	render() {
		console.log('this.props in TimeSlots', this.props);
		console.log('this.props.meta = ', this.props.meta);
		const { day } = this.props;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Menu>
							<Menu.Item key={day.value}>
								{this.renderTimeSlots(day)}
							</Menu.Item>
						</Menu>
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

export default connect(mapStateToProps, null)(TimeSlots);
