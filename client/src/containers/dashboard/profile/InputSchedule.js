import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select, Menu, Dropdown, Icon, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

class InputSchedule extends Component {
	renderDaysOfWeekDropdown(name) {
		return <div>{name}</div>;
	}
	render() {
		console.log('this.props in InputSchedule', this.props);
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={3}>
						{this.renderDaysOfWeekDropdown(this.props.data.name)}
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
