import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { Row, Col, Dropdown, Icon } from 'antd';
import TimeSlots from './TimeSlots';

class DayDropdown extends Component {
	render() {
		//console.log('this.props in DayDropdown', this.props);
		const { input, day } = this.props;
		const menu = <TimeSlots day={day} />;
		return (
			<div>
				<Row type="flex" justify="space-between" align="middle">
					<Col span={24}>
						<Dropdown overlay={menu}>
							<a className="ant-dropdown-link">
								{day.name} <Icon type="down" />
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

export default connect(mapStateToProps, null)(DayDropdown);
