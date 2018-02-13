import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Menu, Checkbox } from 'antd';

const checkedTimeSlots = [];

class TimeSlots extends Component {
	state = {
		checkedList: checkedTimeSlots
	};

	onChange = checkedList => {
		console.log('checkedList = ', checkedList);
		this.setState({
			checkedList
		});
	};

	renderCheckbox = ({ input, timeSlot }) => {
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

	renderTimeSlotCheckbox(timeSlot) {
		return (
			<Field
				name={timeSlot.key}
				timeSlot={timeSlot}
				component={this.renderCheckbox}
			/>
		);
	}

	renderTimeSlotCheckboxes(timeSlots) {
		return _.map(timeSlots, timeSlot => {
			return (
				<Menu.Item key={timeSlot.key}>
					{this.renderTimeSlotCheckbox(timeSlot)}
				</Menu.Item>
			);
		});
	}

	// renderTimeSlotCheckboxes(timeSlots) {
	// 	return _.map(timeSlots, timeSlot => {
	// 		return (
	// 			<Menu.Item key={timeSlot.key}>
	// 				<Checkbox.Group onChange={this.onChange}>
	// 					<Row key={timeSlot.key} align="middle">
	// 						<Col span={24}>
	// 							<Checkbox
	// 								onChange={this.onChange}
	// 								value={timeSlot.key}
	// 							>
	// 								{timeSlot.label}
	// 							</Checkbox>
	// 						</Col>
	// 					</Row>
	// 				</Checkbox.Group>
	// 			</Menu.Item>
	// 		);
	// 	});
	// }

	handleMenuClick = e => {
		console.log('e.key = ', e.key);
		if (e.key === '3') {
			this.setState({ visible: false });
		}
	};

	render() {
		//console.log('this.props in TimeSlots', this.props);
		const { day, input } = this.props;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Menu onClick={this.handleMenuClick}>
							{this.renderTimeSlotCheckboxes(day.timeSlots)}
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

TimeSlots = connect(mapStateToProps, null)(TimeSlots);

export default reduxForm({
	//validate: validate,
	form: 'timeSlots' // state.form.profile
})(TimeSlots);
