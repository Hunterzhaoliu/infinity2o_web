import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GREY_2 } from '../styles/ColorConstants';
import { Row, Col, Table, Popover, Button, Icon } from 'antd';
import './DisplayField.css';

class DisplayField extends Component {
	numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	renderNeuronExplanation() {
		const { colorTheme } = this.props;
		document.documentElement.style.setProperty(
			`--text7Color`,
			colorTheme.text7Color
		);
		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);

		const neuronExplanation = (
			<div>
				<p
					style={{
						padding: '7px 0px 0px',
						color: colorTheme.text2Color
					}}
				>
					Use neurons to 'Say Hi' to more matches.
				</p>
			</div>
		);

		return (
			<Popover
				style={{
					borderColor: colorTheme.text8Color,
					backgroundColor: colorTheme.text8Color,
					color: colorTheme.text3Color
				}}
				content={neuronExplanation}
			>
				<Button
					style={{
						borderColor: colorTheme.text8Color,
						backgroundColor: colorTheme.text8Color,
						color: colorTheme.text3Color,
						padding: '0px 5px 0px'
					}}
					size="small"
				>
					<Icon
						style={{
							fontSize: 12,
							padding: '0px 0px 6px'
						}}
						type="question-circle-o"
					/>
				</Button>
			</Popover>
		);
	}

	renderValue(label, value) {
		const { colorTheme, infinityStatus } = this.props;
		document.documentElement.style.setProperty(
			`--backgroundColor`,
			colorTheme.backgroundColor
		);
		document.documentElement.style.setProperty(
			`--text3Color`,
			colorTheme.text3Color
		);
		document.documentElement.style.setProperty(
			`--text4Color`,
			colorTheme.text4Color
		);
		document.documentElement.style.setProperty(
			`--text7Color`,
			colorTheme.text7Color
		);
		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);

		if (
			label === 'Neurons: ' ||
			label === 'Name: ' ||
			label === 'E-mail: ' ||
			label === 'Age: ' ||
			label === 'Time Zone: '
		) {
			if (label === 'Neurons: ' && infinityStatus) {
				return (
					<div>
						<Col>
							<p>"infinity"</p>
						</Col>
						<Col>{this.renderNeuronExplanation()}</Col>
					</div>
				);
			} else if (label === 'Neurons: ' && !infinityStatus) {
				let displayNeuronsInBillions = value;
				if (displayNeuronsInBillions !== undefined) {
					displayNeuronsInBillions *= 1000000000;
					let finalDisplayString =
						this.numberWithCommas(displayNeuronsInBillions) +
						' (' +
						value +
						') Billion Neurons';

					return (
						<Row type="flex" justify="start" align="middle">
							<Col style={{ padding: '25px 0px 0px' }}>
								<p>{finalDisplayString}</p>
							</Col>
							<Col offset={1} style={{ padding: '7px 0px 0px' }}>
								{this.renderNeuronExplanation()}
							</Col>
						</Row>
					);
				}
			} else if (
				value === null ||
				value === undefined ||
				typeof value === 'string' ||
				typeof value === 'number'
			) {
				return value;
			}
		} else if (label === 'Availability: ') {
			// value = profile.availability
			if (Object.keys(value).length !== 0) {
				const daysOfWeek = [
					'monday',
					'tuesday',
					'wednesday',
					'thursday',
					'friday',
					'saturday',
					'sunday'
				];

				// determines the width of the table & checks if user has timeSlots
				let numberOfDaysAvailable = 0;

				daysOfWeek.forEach(day => {
					if (value[day].length > 0) {
						numberOfDaysAvailable += 1;
					}
				});
				const widthOfTable = numberOfDaysAvailable * 75 + 'px';
				document.documentElement.style.setProperty(
					`--widthOfTable`,
					widthOfTable
				);
				if (numberOfDaysAvailable === 0) {
					return;
				}

				// sets up availability table
				let columnHeaders = [
					{
						title: 'Mon',
						dataIndex: 'monday',
						align: 'center'
					},
					{
						title: 'Tues',
						dataIndex: 'tuesday',
						align: 'center'
					},
					{
						title: 'Wed',
						dataIndex: 'wednesday',
						align: 'center'
					},
					{
						title: 'Thurs',
						dataIndex: 'thursday',
						align: 'center'
					},
					{
						title: 'Fri',
						dataIndex: 'friday',
						align: 'center'
					},
					{
						title: 'Sat',
						dataIndex: 'saturday',
						align: 'center'
					},
					{
						title: 'Sun',
						dataIndex: 'sunday',
						align: 'center'
					}
				];

				const indexInTimeSlot = {
					'6-8 AM': 0,
					'8-10 AM': 1,
					'10-12 AM': 2,
					'12-2 PM': 3,
					'2-4 PM': 4,
					'4-6 PM': 5,
					'6-8 PM': 6,
					'8-10 PM': 7,
					'10-12 PM': 8
				};

				let timeSlots = [
					{ key: 0 },
					{ key: 1 },
					{ key: 2 },
					{ key: 3 },
					{ key: 4 },
					{ key: 5 },
					{ key: 6 },
					{ key: 7 },
					{ key: 8 }
				];

				// tells what index to splice from columnHeaders
				let i = 0;

				// fills in timeSlots (all of the data)
				daysOfWeek.forEach(day => {
					if (value[day] !== undefined) {
						if (value[day].length > 0) {
							value[day].forEach(timeSlot => {
								const indexInTimeSlots =
									indexInTimeSlot[timeSlot];
								timeSlots[indexInTimeSlots][day] = timeSlot;
							});
							i++;
						} else {
							columnHeaders.splice(i, 1);
						}

						//deletes all of the unnecessary rows
						if (day === 'sunday') {
							for (i = 0; i < timeSlots.length; ) {
								const row = timeSlots[i];
								if (Object.keys(row).length > 1) {
									i++;
								} else {
									timeSlots.splice(i, 1);
								}
							}
						}
					}
				});

				return (
					<Table
						dataSource={timeSlots}
						columns={columnHeaders}
						bordered={true}
						pagination={false}
						showHeader={true}
						size="small"
					/>
				);
			}
		} else if (label === 'Interest(s): ') {
			// value = profile.interests
			let formattedInterests = '';
			let upperCaseInterest = '';
			for (let i = 0; i < value.length; i++) {
				upperCaseInterest =
					value[i][0].toUpperCase() + value[i].substring(1);
				// replaces underscore in two word interests with space
				upperCaseInterest = upperCaseInterest.replace(/_/g, ' ');
				const spaceIndex = upperCaseInterest.indexOf(' ');
				if (spaceIndex !== -1) {
					const secondWordFirstLetterIndex = spaceIndex + 1;
					upperCaseInterest =
						upperCaseInterest.substr(
							0,
							secondWordFirstLetterIndex
						) +
						upperCaseInterest[
							secondWordFirstLetterIndex
						].toUpperCase() +
						upperCaseInterest.substr(
							secondWordFirstLetterIndex + 1
						);
				}

				formattedInterests += upperCaseInterest;
				// adds comma between interests
				if (value.length === 2 && i === 0) {
					formattedInterests += ' & ';
				} else if (i !== value.length - 1) {
					formattedInterests += ', ';
					if (i === value.length - 2) {
						formattedInterests += '& ';
					}
				}
			}
			return formattedInterests;
		}
	}

	render() {
		const { colorTheme, label, value, loggedInState } = this.props;

		let textColor = colorTheme.text2Color;
		if (loggedInState === 'not_logged_in') {
			textColor = GREY_2;
		}
		return (
			<Row type="flex" justify="start" align="middle">
				<Col
					sm={{ span: 18 }}
					md={{ span: 19 }}
					lg={{ span: 20 }}
					xl={{ span: 21 }}
				>
					<h3
						style={{
							color: textColor
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
		infinityStatus: state.profile.payment.infinityStatus,
		loggedInState: state.auth.loggedInState
	};
}

export default connect(mapStateToProps, null)(DisplayField);
