import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select, Menu, Dropdown, Icon, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

class InputSchedule extends Component {
	renderMenuItems(timeSlots) {
		return _.map(timeSlots, timeSlot => {
			return <Menu.Item key={timeSlot.key}> {timeSlot.label} </Menu.Item>;
		});
	}
	render() {
		console.log('this.props in InputSchedule', this.props);
		const menu = <Menu>{this.renderMenuItems(this.props.day.timeSlots)}</Menu>;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Dropdown overlay={menu}>
							<a className="ant-dropdown-link" href="#">
								{this.props.day.name} <Icon type="down" />
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
		colorTheme: state.colorTheme
	};
}

export default connect(mapStateToProps, null)(InputSchedule);
