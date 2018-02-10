//import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import daysOfWeek from './daysOfWeek';
import {
	Row,
	Col,
	Select,
	Menu,
	Dropdown,
	Icon,
	Checkbox,
	TreeSelect
} from 'antd';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const times = [
	{
		label: '7-9 AM',
		value: '7-9 AM',
		key: '7-9 AM'
	},
	{
		label: '9-11 AM',
		value: '9-11 AM',
		key: '9-11 AM'
	},
	{
		label: '11 AM-1 PM',
		value: '11 AM-1 PM',
		key: '11 AM-1 PM'
	},
	{
		label: '1-3 PM',
		value: '1-3 PM',
		key: '1-3 PM'
	},
	{
		label: '3-5 PM',
		value: '3-5 PM',
		key: '3-5 PM'
	},
	{
		label: '5-7 PM',
		value: '5-7 PM',
		key: '5-7 PM'
	},
	{
		label: '7-9 PM',
		value: '7-9 PM',
		key: '7-9 PM'
	},
	{
		label: '9-11 PM',
		value: '9-11 PM',
		key: '9-11 PM'
	}
];

const weekTree = [
	{
		label: 'Monday',
		value: 'Monday',
		key: 'Monday',
		children: times
	},
	{
		label: 'Tuesday',
		value: 'Tuesday',
		key: 'Tuesday',
		children: times
	},
	{
		label: 'Wednesday',
		value: 'Wednesday',
		key: 'Wednesday',
		children: times
	},
	{
		label: 'Wednesday',
		value: 'Wednesday',
		key: 'Wednesday',
		children: times
	},
	{
		label: 'Thursday',
		value: 'Thursday',
		key: 'Thursday',
		children: times
	},
	{
		label: 'Friday',
		value: 'Friday',
		key: 'Friday',
		children: times
	},
	{
		label: 'Saturday',
		value: 'Saturday',
		key: 'Saturday',
		children: times
	},
	{
		label: 'Sunday',
		value: 'Sunday',
		key: 'Sunday',
		children: times
	}
];

class InputSchedule extends Component {
	state = {
		checkedList: [],
		indeterminate: true,
		checkAll: false,
		visible: false
	};

	onSchedChange = checkedList => {
		this.setState({
			checkedList,
			indeterminate: !!checkedList.length && checkedList.length < times.length,
			checkAll: checkedList.length === times.length
		});
	};

	onCheckAllChange = e => {
		this.setState({
			checkedList: e.target.checked ? times : [],
			indeterminate: false,
			checkAll: e.target.checked
		});
	};

	handleVisibleChange = flag => {
		this.setState({ visible: flag });
	};
	renderCheckboxOptionPosition() {
		return _.map(times, timeSpan => {
			return (
				<Row>
					<Checkbox>{timeSpan}</Checkbox>
				</Row>
			);
		});
	}
	renderDaysOfWeekDropdown() {
		const menu = (
			<Menu>
				<Menu.Item>
					<div>
						<div style={{ borderBottom: '1px solid #E9E9E9' }}>
							<Checkbox
								indeterminate={this.state.indeterminate}
								onChange={this.onCheckAllChange}
								checked={this.state.checkAll}
							>
								Check all
							</Checkbox>
						</div>
						<br />
						<CheckboxGroup
							value={this.state.checkedList}
							onChange={this.onSchedChange}
						>
							{this.renderCheckboxOptionPosition()}
						</CheckboxGroup>
					</div>
				</Menu.Item>
			</Menu>
		);
		return _.map(daysOfWeek, day => {
			return (
				<Col span={3}>
					<Dropdown
						{...this.props.input}
						value={this.props.input.value || []}
						overlay={menu}
						onVisibleChange={this.handleVisibleChange}
						visible={this.state.visible}
						style={{
							borderColor: this.props.colorTheme.text6Color
						}}
					>
						<a className="ant-dropdown-link">
							{day.name} <Icon type="down" />
						</a>
					</Dropdown>
				</Col>
			);
		});
	}
	render() {
		//console.log('this.props in InputSchedule', this.props);
		return (
			<div>
				<Row type="flex" justify="middle" align="middle">
					<Col span={24}>
						<h3
							style={{
								color: this.props.colorTheme.keyText5Color
							}}
						>
							When are you free to video chat for your class?
						</h3>
					</Col>
				</Row>
				<Row type="flex" justify="middle" align="middle">
					<Col span={24}>{this.renderDaysOfWeekDropdown()}</Col>
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

export default connect(mapStateToProps, null)(InputSchedule);
