import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActionCreators from '../../actions/auth';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as askActionCreators from '../../actions/ask';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Button, Input, Icon } from 'antd';
import ErrorMessage from '../profile/edit/ErrorMessage';
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

	onClickAddAnswer = () => {
		//console.log('this.props = ', this.props);
		this.props.onClickAddAnswer();
	};

	onChangeAnswer = e => {
		this.props.onChangeAnswer(e.target.value, e.target.name);
	};

	renderAnswerInputs(newAnswers) {
		const { colorTheme, ask } = this.props;
		return _.map(newAnswers, (answer, key) => {
			//console.log('key = ', key);
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
						<Col md={{ span: 3 }}>
							<h4
								style={{
									color: colorTheme.keyText5Color
								}}
							>
								Answer {key + 1}:
							</h4>
						</Col>
						<Col md={{ span: 6, offset: 1 }}>
							<Input
								name={key}
								onChange={this.onChangeAnswer}
								style={{
									width: 180,
									borderColor: colorTheme.text7Color,
									background: colorTheme.text7Color,
									color: colorTheme.text3Color
								}}
							/>
						</Col>
						<Col md={{ span: 2, offset: 1 }}>
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
						message="Between 2 & 25 characters"
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

	renderAddAnswerButton(displayAddAnswerButton, colorTheme) {
		if (displayAddAnswerButton) {
			return (
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '1% 0% 0%' // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 0 }}
						md={{ span: 5 }}
						lg={{ span: 4 }}
						xl={{ span: 3 }}
					/>
					<Col
						sm={{ span: 3 }}
						md={{ span: 3 }}
						lg={{ span: 3 }}
						xl={{ span: 3 }}
					>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text2Color
							}}
							onClick={this.onClickAddAnswer}
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
		const { colorTheme, saveAsk, ask, history } = this.props;
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
						lg={{ span: 4 }}
						xl={{ span: 3 }}
					>
						<h3
							style={{
								color: colorTheme.keyText5Color
							}}
						>
							Question:
						</h3>
					</Col>
					<Col
						sm={{ span: 10 }}
						md={{ span: 10 }}
						lg={{ span: 10 }}
						xl={{ span: 10 }}
					>
						<Input
							onChange={this.onChangeQuestion}
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						/>
					</Col>
					<Col
						sm={{ span: 2, offset: 1 }}
						md={{ span: 2, offset: 1 }}
						lg={{ span: 2, offset: 1 }}
						xl={{ span: 2, offset: 1 }}
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
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '3% 0% 0%' // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 0 }}
						md={{ span: 5 }}
						lg={{ span: 4 }}
						xl={{ span: 3 }}
					/>
					<Col
						sm={{ span: 3 }}
						md={{ span: 19 }}
						lg={{ span: 20 }}
						xl={{ span: 21 }}
					>
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
					align="middle"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 0 }}
						md={{ span: 5 }}
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
		ask: state.ask
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
		onChangeAnswer: (newAnswer, answerIndex) => {
			askDispatchers.onChangeAnswer(newAnswer, answerIndex);
		},
		saveAsk: (ask, history) => {
			askDispatchers.saveAsk(ask, history);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Ask);
