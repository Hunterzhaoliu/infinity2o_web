import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import optionFields from './optionFields';
import { Row, Col, Select, Menu, Dropdown, Icon, Checkbox } from 'antd';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['7-9 AM', '9-11 AM', '11 AM -1 PM'];

class InputSchedule extends Component {
	state = {
		inputValue: 0,
		checkedList: [],
		indeterminate: true,
		checkAll: false,
		visible: false
	};

	onSchedChange = checkedList => {
		this.setState({
			checkedList,
			indeterminate:
				!!checkedList.length &&
				checkedList.length < plainOptions.length,
			checkAll: checkedList.length === plainOptions.length
		});
	};

	onCheckAllChange = e => {
		this.setState({
			checkedList: e.target.checked ? plainOptions : [],
			indeterminate: false,
			checkAll: e.target.checked
		});
	};

	handleVisibleChange = flag => {
		this.setState({ visible: flag });
	};

	render() {
		//console.log('this.props in InputSchedule', this.props);
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
							options={plainOptions}
							value={this.state.checkedList}
							onChange={this.onSchedChange}
						/>
					</div>
				</Menu.Item>
			</Menu>
		);

		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col span={24}>
						<h3
							style={{
								color: this.props.colorTheme.keyText5Color
							}}
						>
							When are you free to video chat for your class?
						</h3>
						<Dropdown
							overlay={menu}
							onVisibleChange={this.handleVisibleChange}
							visible={this.state.visible}
							style={{
								borderColor: this.props.colorTheme.text6Color
							}}
						>
							<a className="ant-dropdown-link">
								Monday <Icon type="down" />
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
