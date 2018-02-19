import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Dropdown, Icon, Menu, Checkbox } from 'antd';
//import TimeSlots from './TimeSlots';

// const timeSlotOptions = [
// 	'6-8 AM',
// 	'8-10 AM',
// 	'10-12 noon',
// 	'12-2 PM',
// 	'2-4 PM ',
// 	'4-6 PM',
// 	'6-8 PM ',
// 	'8-10 PM',
// 	'10-12 midnight'
// ];

const timeSlotOptions = ['6-8 AM', '8-10 AM'];

class DayDropdown extends Component {
	// renderMenuItems() {
	//     return _.map(timeSlotOptions, timeSlot => {
	//         console.log('day = ')
	//     })
	// }

	onChangeTimeSlot = e => {
		console.log('onChangeTimeSlot e.target.value = ', e.target.value);
	};

	render() {
		console.log('this.props in DayDropdown', this.props);
		const { colorTheme, day, preSelectedTimeSlots } = this.props;
		//const menu2 = <TimeSlots day={day} />;
		const menu = (
			<Menu>
				<Menu.Item key="monday 6-8 AM">
					<Checkbox
						checked={true}
						value={{ monday: '6-8 AM' }}
						onChange={this.onChangeTimeSlot}
					>
						6-8 AM
					</Checkbox>
				</Menu.Item>
				<Menu.Item key="monday 8-10 AM">
					<Checkbox
						value={{ monday: '8-10 AM' }}
						onChange={this.onChangeTimeSlot}
					>
						8-10 AM
					</Checkbox>
				</Menu.Item>
			</Menu>
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
