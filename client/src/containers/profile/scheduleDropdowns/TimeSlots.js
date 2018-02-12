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

	renderMenuItems(timeSlots) {
		return _.map(timeSlots, timeSlot => {
			return (
				<Row key={timeSlot.key}>
					<Col span={24}>
						<Checkbox value={timeSlot.key}>
							{timeSlot.label}
						</Checkbox>
					</Col>
				</Row>
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
						<Menu>
							<Menu.Item key={day.value}>
								<Checkbox.Group onChange={this.onChange}>
									{this.renderMenuItems(day.timeSlots)}
								</Checkbox.Group>
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
