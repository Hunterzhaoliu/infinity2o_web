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
	state = {
		visible: false
	};

	renderMenuItems(day, newTimeSlots) {
		return _.map(timeSlotOptions, timeSlot => {
			return (
				<Menu.Item key={day.value + ' ' + timeSlot}>
					<Checkbox
						checked={this.isChecked(timeSlot, newTimeSlots)}
						value={[day.value, timeSlot]}
						onChange={this.onChangeTimeSlot}
					>
						{timeSlot}
					</Checkbox>
				</Menu.Item>
			);
		});
	}

	isChecked(timeSlot, newTimeSlots) {
		if (newTimeSlots !== undefined && newTimeSlots.includes(timeSlot)) {
			return true;
		}
	}

	onChangeTimeSlot = e => {
		//console.log('onChangeTimeSlot e.target.value = ', e.target.value);
		this.props.onChangeTimeSlot(e.target.value);
	};

	handleVisibleChange = flag => {
		this.setState({ visible: flag });
	};

	render() {
		//console.log('this.props in DayDropdown', this.props);
		const { colorTheme, day, oldTimeSlots, profile } = this.props;

		// copy over initial old checked time slots
		if (profile.newAvailability === undefined) {
			profile.newAvailability = profile.availability;
		}
		const newTimeSlots = profile.newAvailability[day.value];
		const menu = <Menu>{this.renderMenuItems(day, newTimeSlots)}</Menu>;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Dropdown
							onVisibleChange={this.handleVisibleChange}
							visible={this.state.visible}
							overlay={menu}
						>
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
