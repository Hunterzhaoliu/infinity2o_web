import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

const treeData = [
	{
		title: 'United States',
		key: 'United States',
		children: [
			{ title: 'Hawaii', key: 'Hawaii', UTC_offset: -10 },
			{ title: 'Alaska', key: 'Alaska', UTC_offset: -9 },
			{ title: 'Pacific', key: 'US-Pacific', UTC_offset: -8 },
			{ title: 'Mountain', key: 'US-Mountain', UTC_offset: -7 },
			{ title: 'Central', key: 'US-Central', UTC_offset: -6 },
			{ title: 'Eastern', key: 'US-Eastern', UTC_offset: -5 }
		]
	},
	{
		title: 'Canada',
		key: 'Canada',
		children: [
			{ title: 'Pacific', key: 'C-Pacific', UTC_offset: -8 },
			{ title: 'Mountain', key: 'C-Mountain', UTC_offset: -7 },
			{ title: 'Central', key: 'C-Central', UTC_offset: -6 },
			{ title: 'Eastern', key: 'C-Eastern', UTC_offset: -5 },
			{ title: 'Atlantic', key: 'Atlantic', UTC_offset: -4 },
			{ title: 'Newfoundland', key: 'Newfoundland', UTC_offset: -3.5 }
		]
	},
	{
		title: 'Europe',
		key: 'Europe',
		children: [
			{ title: 'BST', key: 'BST', UTC_offset: 1 },
			{ title: 'CEST', key: 'CEST', UTC_offset: 2 },
			{ title: 'CET', key: 'CET', UTC_offset: 1 },
			{ title: 'EEST', key: 'EEST', UTC_offset: 3 }
		]
	}
];

class InputTimeZone extends Component {
	state = {
		greaterThanOneTimeZone: false,
		expandedKeys: [],
		autoExpandParent: true,
		checkedKeys: [],
		selectedKeys: []
	};

	onExpand = expandedKeys => {
		console.log('onExpand', arguments);
		// if not set autoExpandParent to false, if children expanded, parent can not collapse.
		// or, you can remove all expanded children keys.
		this.setState({
			expandedKeys,
			autoExpandParent: false
		});
	};

	onCheck = (checkedKeys, state) => {
		console.log('onCheck', checkedKeys);
		this.setState({ checkedKeys });
		if (checkedKeys.length > 1) {
			// show warning that user can't check > 1 box
			this.setState({ greaterThanOneTimeZone: true });
			// TODO: replace setState with action creators
		} else {
			this.setState({ greaterThanOneTimeZone: false });
		}
		console.log('state = ', state);
	};

	onSelect = (selectedKeys, info) => {
		console.log('onSelect', info);
		this.setState({ selectedKeys });
	};

	renderTreeNodes = data => {
		return data.map(item => {
			if (item.children) {
				return (
					<TreeNode title={item.title} key={item.key} dataRef={item}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode {...item} />;
		});
	};

	render() {
		//console.log('this.props in InputTimeZone', this.props);

		return (
			<div>
				<p
					style={{
						color: this.props.colorTheme.text2Color
					}}
				>
					What time zone are you in?
				</p>
				<Tree
					checkable
					onExpand={this.onExpand}
					expandedKeys={this.state.expandedKeys}
					autoExpandParent={this.state.autoExpandParent}
					onCheck={this.onCheck}
					checkedKeys={this.state.checkedKeys}
					onSelect={this.onSelect}
					selectedKeys={this.state.selectedKeys}
				>
					{this.renderTreeNodes(treeData)}
				</Tree>
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
