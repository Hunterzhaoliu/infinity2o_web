import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Row, Col, Menu, Icon, Checkbox } from 'antd';
//const CheckboxGroup = Checkbox.Group;

class TimeSlots extends Component {
	renderMenuItems(timeSlots) {
		return _.map(timeSlots, timeSlot => {
			console.log('timeSlot = ', timeSlot);
			//return <div key={timeSlot.key}>Hi</div>;
			return <Menu.Item key={timeSlot.key}>{timeSlot.label}</Menu.Item>;
		});
	}

	render() {
		console.log('this.props in TimeSlots', this.props);
		const { input, timeSlots } = this.props;
		//const menu = <Menu>{this.renderMenuItems(this.props.timeSlots)}</Menu>;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Menu>{this.renderMenuItems(timeSlots)}</Menu>
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
	form: 'profileDayDropdownTimeSlots' // state.form.profileDayDropdownTimeSlots
})(TimeSlots);
