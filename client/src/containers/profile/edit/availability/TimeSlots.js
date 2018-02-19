import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Menu, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const timeSlotOptions1 = ['6-8 AM', '8-10 AM', '10-12 noon'];
const timeSlotOptions2 = ['12-2 PM', '2-4 PM ', '4-6 PM'];
const timeSlotOptions3 = ['6-8 PM ', '8-10 PM', '10-12 midnight'];

class TimeSlots extends Component {
	renderCheckboxs = ({ input, timeSlots }) => {
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<CheckboxGroup
							options={timeSlotOptions1}
							onChange={input.onChange}
							value={input.value || []}
						/>
					</Col>
				</Row>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<CheckboxGroup
							options={timeSlotOptions2}
							onChange={input.onChange}
							value={input.value || []}
						/>
					</Col>
				</Row>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<CheckboxGroup
							options={timeSlotOptions3}
							onChange={input.onChange}
							value={input.value || []}
						/>
					</Col>
				</Row>
			</div>
		);
	};

	// renderTimeSlots(day) {
	// 	return (
	// 		<Field
	// 			name={'dayDropdowns.' + day.value}
	// 			timeSlots={day.timeSlots}
	// 			component={this.renderCheckboxs}
	// 		/>
	// 	);
	// }

	render() {
		//console.log('this.props in TimeSlots', this.props);
		const { day } = this.props;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						{/* <Menu>{this.renderTimeSlots(day)}</Menu> */}
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
