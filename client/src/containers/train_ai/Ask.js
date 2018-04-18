import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActionCreators from '../../actions/auth';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as askActionCreators from '../../actions/ask';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Button, Input, Icon } from 'antd';
import ErrorMessage from './ErrorMessage';
const { Content } = Layout;

class Ask extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserProfile();
		this.props.onTrainAI();
	}

	onChangeQuestion = e => {
		this.props.onChangeQuestion(e.target.value);
	};

	onChangeAnswer = e => {
		this.props.onChangeAnswer(e.target.value, e.target.name);
	};

	renderAnswerInputs(newAnswers) {
		const { colorTheme, ask, windowWidth } = this.props;
		let answerInputWidth = windowWidth * 0.183; // = 220/1200
		return _.map(newAnswers, (answer, key) => {
			return (
				<div key={key}>
					<Row
						type="flex"
						justify="start"
						align="middle"
						style={{
							padding: '3% 0% 0%' // top left&right bottom
						}}
					>
						<Col
							sm={{ span: 5 }}
							md={{ span: 5 }}
							lg={{ span: 5 }}
							xl={{ span: 3 }}
						>
							<h3
								style={{
									color: colorTheme.text5Color
								}}
							>
								Answer {key + 1}:
							</h3>
						</Col>
						<Col
							sm={{ span: 6, offset: 0 }}
							md={{ span: 9, offset: 0 }}
							lg={{ span: 9, offset: 0 }}
							xl={{ span: 9, offset: 0 }}
						>
							<Input
								name={key}
								onChange={this.onChangeAnswer}
								style={{
									width: answerInputWidth,
									borderColor: colorTheme.text7Color,
									background: colorTheme.text7Color,
									color: colorTheme.text3Color
								}}
							/>
						</Col>
						<Col
							sm={{ span: 1, offset: 0 }}
							md={{ span: 1, offset: 0 }}
							lg={{ span: 1, offset: 0 }}
							xl={{ span: 1, offset: 0 }}
						>
							<h5
								style={{
									color: colorTheme.text4Color
								}}
							>
								{25 - ask.newAnswers[key].length}
							</h5>
						</Col>
					</Row>
					<ErrorMessage
						message="Between 1 & 25 characters"
						hasError={ask.hasAnswersError[key]}
					/>
				</div>
			);
		});
	}

	isAskDisabled(ask) {
		if (
			ask.newQuestion === null ||
			ask.hasQuestionError ||
			ask.newAnswers[0].length === 0 ||
			ask.newAnswers[1].length === 0 ||
			ask.hasAnswersError[0] ||
			ask.hasAnswersError[1] ||
			ask.hasAnswersError[2] ||
			ask.hasAnswersError[3]
		) {
			return true;
		} else {
			return false;
		}
	}

	renderAskIcon(saveState) {
		if (saveState === 'save_start') {
			return <Icon type="loading" />;
		} else if (saveState === 'save_done') {
			return <Icon type="check" />;
		} else if (saveState === 'save_error') {
			return <Icon type="warning" />;
		}
	}

	renderRemoveAnswerButton(displayRemoveAnswerButton, colorTheme) {
		const { onClickRemoveAnswer } = this.props;
		if (displayRemoveAnswerButton) {
			return (
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 3 }}
					/>
					<Col>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text2Color
							}}
							onClick={onClickRemoveAnswer}
						>
							Remove Answer
						</Button>
					</Col>
				</Row>
			);
		} else {
			return;
		}
	}

	renderAddAnswerButton(displayAddAnswerButton, colorTheme) {
		const { onClickAddAnswer } = this.props;
		if (displayAddAnswerButton) {
			return (
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 3 }}
					/>
					<Col>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text2Color
							}}
							onClick={onClickAddAnswer}
						>
							Add Answer
						</Button>
					</Col>
				</Row>
			);
		} else {
			return;
		}
	}

	renderAskForm() {
		const { colorTheme, saveAsk, ask, history, windowWidth } = this.props;
		let answerInputWidth = windowWidth * 0.183; // = 220/1200
		let questionInputWidth = answerInputWidth * 2;

		return (
			<div>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 3 }}
					>
						<h3
							style={{
								color: colorTheme.text5Color
							}}
						>
							Question:
						</h3>
					</Col>
					<Col
						sm={{ span: 11 }}
						md={{ span: 18 }}
						lg={{ span: 18 }}
						xl={{ span: 17 }}
					>
						<Input
							onChange={this.onChangeQuestion}
							style={{
								width: questionInputWidth,
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						/>
					</Col>
					<Col
						sm={{ span: 1 }}
						md={{ span: 1 }}
						lg={{ span: 1 }}
						xl={{ span: 1 }}
					>
						<h5
							style={{
								color: colorTheme.text4Color
							}}
						>
							{50 - ask.questionLength}
						</h5>
					</Col>
				</Row>
				<ErrorMessage
					message="Between 8 to 50 characters"
					hasError={ask.hasQuestionError}
				/>
				{this.renderAnswerInputs(ask.newAnswers)}
				{this.renderAddAnswerButton(
					ask.displayAddAnswerButton,
					colorTheme
				)}
				{this.renderRemoveAnswerButton(
					ask.displayRemoveAnswerButton,
					colorTheme
				)}
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
							disabled={this.isAskDisabled(ask)}
							onClick={() => saveAsk(ask, history)}
						>
							Ask
							{this.renderAskIcon(ask.save)}
						</Button>
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		//console.log('this.props in Ask.js', this.props);
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					padding: '100px 50px 50px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					/>
					<Col
						sm={{ span: 24 }}
						md={{ span: 14 }}
						lg={{ span: 14 }}
						xl={{ span: 14 }}
					>
						{this.renderAskForm()}
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					/>
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
		colorTheme: state.colorTheme,
		ask: state.ask,
		windowWidth: state.customHeader.windowWidth
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const indexDispatchers = bindActionCreators(authActionCreators, dispatch);

	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	const askDispatchers = bindActionCreators(askActionCreators, dispatch);

	return {
		fetchUserProfile: () => {
			indexDispatchers.fetchUserProfile();
		},
		onTrainAI: () => {
			colorThemeDispatchers.onTrainAI();
		},
		onChangeQuestion: newQuestion => {
			askDispatchers.onChangeQuestion(newQuestion);
		},
		onClickAddAnswer: () => {
			askDispatchers.onClickAddAnswer();
		},
		onClickRemoveAnswer: () => {
			askDispatchers.onClickRemoveAnswer();
		},
		onChangeAnswer: (newAnswer, answerIndex) => {
			askDispatchers.onChangeAnswer(newAnswer, answerIndex);
		},
		saveAsk: (ask, history) => {
			askDispatchers.saveAsk(ask, history);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Ask);
