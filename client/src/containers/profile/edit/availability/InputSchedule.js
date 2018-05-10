import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayDropdown from './DayDropdown';
import { Row, Col } from 'antd';
import daysOfWeek from './daysOfWeek';

class InputSchedule extends Component {
	renderDaysOfWeekDropdowns(availability) {
		return _.map(daysOfWeek, day => {
			return (
				<Col span={3} key={day.label}>
					<DayDropdown
						day={day}
						oldTimeSlots={availability[day.value]}
					/>
				</Col>
			);
		});
	}

	render() {
		//console.log('this.props in InputSchedule', this.props);
		const { colorTheme, profile } = this.props;

		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Row type="flex" justify="start" align="middle">
							<Col span={24}>
								<h3
									style={{
										color: colorTheme.text4Color
									}}
								>
									When are you free to video chat for your
									class?
								</h3>
							</Col>
						</Row>
						<Row type="flex" justify="space-around" align="middle">
							<Col span={24}>
								{this.renderDaysOfWeekDropdowns(
									profile.availability
								)}
							</Col>
						</Row>
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

export default connect(mapStateToProps, null)(InputSchedule);
