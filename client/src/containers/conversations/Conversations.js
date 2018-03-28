import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import conversation1 from './conversation1';

import { Layout, Input, Row, Col, Card, Affix } from 'antd';
const { Content } = Layout;

class Conversations extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onPressConversations();
	}

	renderConversation() {
		const { colorTheme } = this.props;

		return _.map(conversation1, (message, index) => {
			const nameAndMessage = message.senderName + ': ' + message.contents;
			const width = 50 + nameAndMessage.length * 6;
			return (
				<div key={index}>
					<Row type="flex" justify="start">
						<Col>
							<p
								style={{
									color: colorTheme.text5Color
								}}
							>
								{message.senderName}
							</p>
						</Col>
					</Row>
					<Row type="flex" justify="start">
						<Col md={{ span: 24, offset: 0 }}>
							<Card
								bordered={false}
								style={{
									borderColor: colorTheme.text8Color,
									background: colorTheme.text8Color,
									color: colorTheme.text2Color,
									width: width,
									height: 70
								}}
							>
								{message.contents}
							</Card>
						</Col>
					</Row>
					<Row
						style={{
							padding: '36px 0px 0px' // top left&right bottom
						}}
					/>
				</div>
			);
		});
	}

	render() {
		//console.log('Conversations this.props = ', this.props);
		const { colorTheme } = this.props;

		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="end" align="middle">
					<Col md={{ span: 24, offset: 0 }}>
						{this.renderConversation()}
					</Col>
				</Row>
				<Row type="flex" justify="start" align="middle">
					<Col md={{ span: 24, offset: 0 }}>
						<Affix offsetBottom={0}>
							<Input
								placeholder="type here..."
								style={{
									width: 700,
									borderColor: colorTheme.text9Color,
									background: colorTheme.text9Color,
									color: colorTheme.text5Color
								}}
							/>
						</Affix>
					</Col>
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

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		onPressConversations: () => {
			colorThemeDispatchers.onPressConversations();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
