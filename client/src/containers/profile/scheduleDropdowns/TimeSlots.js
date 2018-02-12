import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { reduxForm } from 'redux-form';
import { Row, Col, Menu, Icon, Checkbox } from 'antd';
//const CheckboxGroup = Checkbox.Group;

class TimeSlots extends Component {
	onChange(checkedValues) {
		console.log('checked = ', checkedValues);
	}

	renderMenuItems(timeSlots) {
		return _.map(timeSlots, timeSlot => {
			console.log('timeSlot = ', timeSlot);
			//return <div key={timeSlot.key}>Hi</div>;
			return (
				<Menu.Item key={timeSlot.key}>
					{timeSlot.label}
					<Checkbox.Group onChange={this.onChange}>
						<Row>
							<Col span={8}>
								<Checkbox value="A">A</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox value="B">B</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox value="C">C</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox value="D">D</Checkbox>
							</Col>
							<Col span={8}>
								<Checkbox value="E">E</Checkbox>
							</Col>
						</Row>
					</Checkbox.Group>
				</Menu.Item>
			);
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

export default connect(mapStateToProps, null)(TimeSlots);

// TimeSlots = connect(mapStateToProps, null)(TimeSlots);
//
// export default reduxForm({
// 	form: 'profileDayDropdownTimeSlots' // state.form.profileDayDropdownTimeSlots
// })(TimeSlots);
