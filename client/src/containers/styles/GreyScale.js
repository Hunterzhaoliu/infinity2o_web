import {
	colorsHashtable5,
	GREY_1,
	GREY_3,
	GREY_5,
	GREY_7,
	GREY_9
} from './ColorConstants';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class GreyScale extends Component {
	render() {
		// console.log('this.props in GreyScale.js', this.props);
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: GREY_5
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text1Color }}>
					GreyScale
				</h1>
				<Row type="flex" justify="center">
					<Col span={4}>col-4</Col>
					<Col span={4}>col-4</Col>
					<Col span={4}>col-4</Col>
					<Col span={4}>col-4</Col>
				</Row>
			</Content>
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

export default connect(mapStateToProps, null)(GreyScale);
