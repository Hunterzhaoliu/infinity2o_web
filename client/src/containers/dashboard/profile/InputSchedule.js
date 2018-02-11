import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select, Menu, Dropdown, Icon, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

class InputSchedule extends Component {
	renderDropdown(name) {
		return <Col>{name}</Col>;
	}
	render() {
		console.log('this.props in InputSchedule', this.props);
		const menu = (
			<Menu>
				<Menu.Item key="1">Clicking me will not close the menu.</Menu.Item>
				<Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
				<Menu.Item key="3">Clicking me wil close the menu</Menu.Item>
			</Menu>
		);
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Dropdown overlay={menu}>
							<a className="ant-dropdown-link" href="#">
								{this.props.data.name} <Icon type="down" />
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
