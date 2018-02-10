import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TreeSelect, Row, Col } from 'antd';
//const TreeNode = Tree.TreeNode;

const treeData = [
	{
		label: 'United States',
		value: 'a',
		key: 'United States',
		children: [
			{
				label: 'Hawaii',
				value: 'Hawaii',
				key: 'Hawaii',
				UTC_offset: -10
			},
			{ label: 'Alaska', value: 'Alaska', key: 'Alaska', UTC_offset: -9 },
			{
				label: 'Pacific',
				value: 'US-Pacific',
				key: 'US-Pacific',
				UTC_offset: -8
			},
			{
				label: 'Mountain',
				value: 'US-Mountain',
				key: 'US-Mountain',
				UTC_offset: -7
			},
			{
				label: 'Central',
				value: 'US-Central',
				key: 'US-Central',
				UTC_offset: -6
			},
			{
				label: 'Eastern',
				value: 'US-Eastern',
				key: 'US-Eastern',
				UTC_offset: -5
			}
		]
	},
	{
		label: 'Canada',
		key: 'Canada',
		children: [
			{
				label: 'Pacific',
				value: 'C-Pacific',
				key: 'C-Pacific',
				UTC_offset: -8
			},
			{
				label: 'Mountain',
				value: 'C-Mountain',
				key: 'C-Mountain',
				UTC_offset: -7
			},
			{
				label: 'Central',
				value: 'C-Central',
				key: 'C-Central',
				UTC_offset: -6
			},
			{
				label: 'Eastern',
				value: 'C-Eastern',
				key: 'C-Eastern',
				UTC_offset: -5
			},
			{
				label: 'Atlantic',
				value: 'Atlantic',
				key: 'Atlantic',
				UTC_offset: -4
			},
			{
				label: 'Newfoundland',
				value: 'Newfoundland',
				key: 'Newfoundland',
				UTC_offset: -3.5
			}
		]
	},
	{
		label: 'Europe',
		key: 'Europe',
		children: [
			{ label: 'BST', value: 'BST', key: 'BST', UTC_offset: 1 },
			{ label: 'CEST', value: 'CEST', key: 'CEST', UTC_offset: 2 },
			{ label: 'CET', value: 'CET', key: 'CET', UTC_offset: 1 },
			{ label: 'EEST', value: 'EEST', key: 'EEST', UTC_offset: 3 }
		]
	}
];

class InputTimeZone extends Component {
	state = {
		value: undefined
	};

	onChange = value => {
		console.log('value = ', value);
		this.setState({ value });
	};

	render() {
		//console.log('this.props in InputTimeZone', this.props);

		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 4 }}
						md={{ span: 4 }}
						lg={{ span: 4 }}
						xl={{ span: 4 }}
					>
						<label
							style={{
								color: this.props.colorTheme.keyText5Color
							}}
						>
							{this.props.label}
						</label>
					</Col>
					<Col
						sm={{ span: 19, offset: 1 }}
						md={{ span: 19, offset: 1 }}
						lg={{ span: 19, offset: 1 }}
						xl={{ span: 19, offset: 1 }}
					>
						<TreeSelect
							style={{ width: this.props.width }}
							value={this.state.value}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							treeData={treeData}
							placeholder="Time Zone?"
							onChange={this.onChange}
						/>
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
		userInfo: state.auth.userInfo
	};
}

export default connect(mapStateToProps, null)(InputTimeZone);
