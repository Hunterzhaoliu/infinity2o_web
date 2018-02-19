import _ from 'lodash';
import React, { Component } from 'react';
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
	renderMenuItems(day, preSelectedTimeSlots) {
		//console.log('day.label = ', day.label);
		console.log('preSelectedTimeSlots = ', preSelectedTimeSlots);
		return _.map(timeSlotOptions, timeSlot => {
			//console.log('timeSlot = ', timeSlot);
			return (
				<Menu.Item key={day.label + ' ' + timeSlot}>
					<Checkbox
						value={day.label + ' ' + timeSlot}
						onChange={this.onChangeTimeSlot}
					>
						{timeSlot}
					</Checkbox>
				</Menu.Item>
			);
		});
	}

	isChecked(timeSlot, preSelectedTimeSlots) {
		//return preSelectedTimeSlots.indexOf(timeSlot) !== -1;
	}

	onChangeTimeSlot = e => {
		console.log('onChangeTimeSlot e.target.value = ', e.target.value);
	};

	render() {
		//console.log('this.props in DayDropdown', this.props);
		const { colorTheme, day, preSelectedTimeSlots } = this.props;
		const menu = (
			<Menu>{this.renderMenuItems(day, preSelectedTimeSlots)}</Menu>
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
		colorTheme: state.colorTheme
	};
}

export default connect(mapStateToProps, null)(DayDropdown);
