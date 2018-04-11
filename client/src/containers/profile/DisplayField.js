import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

class DisplayField extends Component {
	renderValue(label, value) {
		const { infinityStatus } = this.props;

		if (
			label === 'Neurons: ' ||
			label === 'Name: ' ||
			label === 'Age: ' ||
			label === 'Time Zone: '
		) {
			if (label === 'Neurons: ' && infinityStatus) {
				return 'infinity';
			} else if (label === 'Neurons: ' && !infinityStatus) {
				let displayNeuronsInBillions = value;
				if (displayNeuronsInBillions !== undefined) {
					displayNeuronsInBillions *= 1000000000;
				}
				return displayNeuronsInBillions;
			} else if (
				value === null ||
				value === undefined ||
				typeof value === 'string' ||
				typeof value === 'number'
			) {
				return value;
			}
		} else if (label === 'Availability: ') {
			let allTimeSlotsToRender = '';
			const timeSlots = Object.entries(value);
			timeSlots.forEach(function(day) {
				const dayName = day[0];
				const dayTimeSlots = day[1];

				const numTimeSlots = dayTimeSlots.length;
				if (numTimeSlots !== 0) {
					// if there are checked time timeSlots add dayName
					allTimeSlotsToRender += dayName + ' ';

					dayTimeSlots.forEach(function(t, i) {
						allTimeSlotsToRender += t;

						if (i === numTimeSlots - 1) {
							// don't add &
						} else {
							allTimeSlotsToRender += ' & ';
						}
					});
					allTimeSlotsToRender += ' | ';
				}
			});
			return allTimeSlotsToRender;
		} else if (label === 'Interest(s): ') {
			let formattedValue = '';
			let i;
			for (i = 0; i < value.length; i++) {
				formattedValue += value[i];
				if (i !== value.length - 1) {
					formattedValue += ', ';
				}
			}
			return formattedValue;
		}
	}

	render() {
		const { colorTheme, label, value } = this.props;
		return (
			<Row type="flex" justify="start" align="middle">
				<Col
					sm={{ span: 5 }}
					md={{ span: 4 }}
					lg={{ span: 3 }}
					xl={{ span: 2 }}
				>
					<h3
						style={{
							color: colorTheme.text6Color
						}}
					>
						{label}
					</h3>
				</Col>
				<Col
					sm={{ span: 18, offset: 1 }}
					md={{ span: 19, offset: 1 }}
					lg={{ span: 20, offset: 1 }}
					xl={{ span: 21, offset: 1 }}
				>
					<h3
						style={{
							color: colorTheme.text3Color
						}}
					>
						{this.renderValue(label, value)}
					</h3>
				</Col>
			</Row>
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
		infinityStatus: state.profile.payment.infinityStatus
	};
}

export default connect(mapStateToProps, null)(DisplayField);
