import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Checkbox } from 'antd';

const checkedTimeSlots = [];

class TimeSlots extends Component {
	state = {
		checkedList: checkedTimeSlots
	};

	// onChange(checkedValues) {
	// 	console.log('checked = ', checkedValues);
	// }

	onChange = checkedList => {
		console.log('checkedList = ', checkedList);
		this.setState({
			checkedList
		});
	};

	renderTimeSlotCheckboxes(timeSlots) {
		return _.map(timeSlots, timeSlot => {
			return (
				<Menu.Item key={timeSlot.key}>
					<Checkbox.Group onChange={this.onChange}>
						<Row key={timeSlot.key}>
							<Col span={24}>
								<Checkbox
									onChange={this.onChange}
									value={timeSlot.key}
								>
									{timeSlot.label}
								</Checkbox>
							</Col>
						</Row>
					</Checkbox.Group>
				</Menu.Item>
			);
		});
	}

	render() {
		console.log('this.props in TimeSlots', this.props);
		const { day } = this.props;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Menu multiple={true} mode="vertical">
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

export default connect(mapStateToProps, null)(TimeSlots);
