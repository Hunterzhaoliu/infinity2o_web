import _ from 'lodash';
import React, { Component } from 'react';
import * as profileActionCreators from '../../../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Dropdown, Icon, Menu, Checkbox } from 'antd';

const timeSlotOptions = [
	'6-8 AM',
	'8-10 AM',
	'10-12 noon',
	'12-2 PM',
	'2-4 PM ',
	'4-6 PM',
	'6-8 PM ',
	'8-10 PM',
	'10-12 midnight'
];

class DayDropdown extends Component {
	renderMenuItems(day, oldTimeSlots, newTimeSlots) {
		//console.log('day.label = ', day.label);

		return _.map(timeSlotOptions, timeSlot => {
			//console.log('timeSlot = ', timeSlot);
			return (
				<Menu.Item key={day.value + ' ' + timeSlot}>
					<Checkbox
						checked={this.isChecked(timeSlot, oldTimeSlots, newTimeSlots)}
						value={[day.value, timeSlot]}
						onChange={this.onChangeTimeSlot}
					>
						{timeSlot}
					</Checkbox>
				</Menu.Item>
			);
		});
	}

	isChecked(timeSlot, oldTimeSlots, newTimeSlots) {
		// console.log('oldTimeSlots = ', oldTimeSlots);
		// console.log('newTimeSlots = ', newTimeSlots);
		//return oldTimeSlots.indexOf(timeSlot) !== -1;
		if (oldTimeSlots !== undefined && oldTimeSlots.includes(timeSlot)) {
			return true;
		}
	}

	onChangeTimeSlot = e => {
		//console.log('onChangeTimeSlot e = ', e);
		this.props.onChangeTimeSlot(e.target.value);
	};

	render() {
		//console.log('this.props in DayDropdown', this.props);
		const { colorTheme, day, oldTimeSlots, profile } = this.props;
		if (profile.newAvailability === undefined) {
			profile.newAvailability = {};
		}
		const newTimeSlots = profile.newAvailability[day.value];
		const menu = (
			<Menu>{this.renderMenuItems(day, oldTimeSlots, newTimeSlots)}</Menu>
		);
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Dropdown overlay={menu}>
							<a
								style={{
									color: colorTheme.text5Color
								}}
							>
								{day.label} <Icon type="down" />
							</a>
						</Dropdown>
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
		onChangeTimeSlot: newTimeSlots => {
			profileDispatchers.onChangeTimeSlot(newTimeSlots);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DayDropdown);
