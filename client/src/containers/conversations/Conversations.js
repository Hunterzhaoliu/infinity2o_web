import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import conversation1 from './conversation1';

import { Layout, Input, Row, Col, Affix } from 'antd';
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
			return (
				<div key={index}>
					<Row type="flex" justify="start" align="middle">
						<Col>
							<p
								style={{
									borderColor: colorTheme.text8Color,
									background: colorTheme.text8Color,
									color: colorTheme.text5Color,
									borderRadius: '25px',
									padding: '8px'
								}}
							>
								{nameAndMessage}
							</p>
						</Col>
					</Row>
					<Row
						style={{
							padding: '5px 0px 0px' // top left&right bottom
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
				{this.renderConversation()}
				<Row type="flex" justify="start" align="middle">
					<Col>
						<Affix offsetBottom={0}>
							<Input
								placeholder="type here..."
								style={{
									width: 492,
									borderColor: colorTheme.text8Color,
									background: colorTheme.text8Color,
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
