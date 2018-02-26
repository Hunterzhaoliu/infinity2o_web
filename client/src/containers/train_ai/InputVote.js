import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as indexActionCreators from '../../actions/index';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Button, Card, Col, Layout, Row } from 'antd';
import questionList from './questionList.js';
const { Content } = Layout;

class InputVote extends Component {
	renderQuestion() {
		const { colorTheme } = this.props;
		return _.map(questionList, oneQuestion => {
			return (
				<Col key={oneQuestion.question} span={12}>
					<Card
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: colorTheme.text2Color
						}}
					>
						<h2
							style={{
								color: colorTheme.text2Color
							}}
						>
							{oneQuestion.question}
						</h2>
						{this.renderAnswer(oneQuestion.answers)}
					</Card>
				</Col>
			);
		});
	}
	renderAnswer(answers) {
		const { colorTheme } = this.props;
		return _.map(answers, answer => {
			return (
				<Row style={{ padding: '8px 0px 0px' }} key={answer}>
					<Button
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text7Color,
							color: colorTheme.text2Color
						}}
					>
						{answer}
					</Button>
				</Row>
			);
		});
	}
	render() {
		const { colorTheme } = this.props;
		//console.log('this.props in InputVote.js', this.props);
		return (
			<Content
				style={{
					padding: '25px 25px 25px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row gutter={36}>{this.renderQuestion()}</Row>
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
	const indexDispatchers = bindActionCreators(indexActionCreators, dispatch);

	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		fetchUserProfile: () => {
			indexDispatchers.fetchUserProfile();
		},
		onVote: () => {
			colorThemeDispatchers.onVote();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
