import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as trainAIActionCreators from '../../actions/trainAI';
import { bindActionCreators } from 'redux';
import { Button, Card, Col, Layout, Row } from 'antd';
const { Content } = Layout;

class InputVote extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserTrainAIAsks();
	}

	onVote(answerIndex, questionIndex, questionId) {
		const { trainAI } = this.props;
		// now we know which answer user pressed so let's pass the answesId too
		const question = trainAI.current4DisplayedAsks[questionIndex];
		const answerId = question.answers[answerIndex]._id;

		//console.log('in onVote answerId = ', answerId);
		this.props.onVote(answerIndex, answerId, questionIndex, questionId);
	}

	onPass(questionIndex) {
		console.log('pass pressed');
		console.log('questionIndex = ', questionIndex);
	}

	renderAnswers(answers, questionIndex) {
		const { colorTheme, trainAI } = this.props;
		return _.map(answers, (answerObject, answerIndex) => {
			// displaying actual answers
			let displayAnswer;
			if (answerObject !== null) {
				displayAnswer = answerObject.answer;
			}

			// displaying the change in voted answer button color
			const question = trainAI.current4DisplayedAsks[questionIndex];
			const questionId = question._id;
			const currentAnswerId = question.answers[answerIndex]._id;

			let displayAnswerButtonColor = colorTheme.text7Color;
			// if user has voted on a question

			if (trainAI.votes[questionId] !== undefined) {
				const votedAnswerId = trainAI.votes[questionId].answerId;
				if (votedAnswerId === currentAnswerId) {
					displayAnswerButtonColor = colorTheme.keyText7Color;
				}
			}

			//console.log('votedAnswerId out of if = ', votedAnswerId);
			return (
				<Row style={{ padding: '8px 0px 0px' }} key={answerIndex}>
					<Button
						style={{
							borderColor: displayAnswerButtonColor,
							background: displayAnswerButtonColor,
							color: colorTheme.text2Color
						}}
						onClick={e => this.onVote(answerIndex, questionIndex, questionId)}
					>
						{displayAnswer}
					</Button>
				</Row>
			);
		});
	}

	renderQandAs() {
		const { colorTheme, trainAI } = this.props;

		return _.map(trainAI.current4DisplayedAsks, (Ask, questionIndex) => {
			let displayQuestion;
			if (Ask !== null) {
				displayQuestion = Ask.question;
			}
			let displayAnswers;
			if (Ask !== null) {
				displayAnswers = Ask.answers;
			}

			return (
				<Col span={12} key={questionIndex}>
					<Card
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: colorTheme.text2Color
						}}
					>
						<h3
							style={{
								color: colorTheme.text2Color
							}}
						>
							{displayQuestion}
						</h3>
						{this.renderAnswers(displayAnswers, questionIndex)}
						<Row style={{ padding: '8px 0px 0px' }}>
							<Button
								style={{
									borderColor: colorTheme.text7Color,
									background: colorTheme.text7Color,
									color: colorTheme.text2Color
								}}
								onClick={e => this.onPass(questionIndex)}
							>
								Pass
							</Button>
						</Row>
					</Card>
					<Row
						style={{
							padding: '36px 0px 0px' // top left&right bottom
						}}
					/>
				</Col>
			);
		});
	}

	render() {
		const { colorTheme } = this.props;
		//console.log('this.props in InputVote.js', this.props);
		return (
			<Content
				style={{
					overflow: 'initial',
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					style={{
						padding: '5px 0px 0px' // top left&right bottom
					}}
					gutter={36}
				>
					{this.renderQandAs()}
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
		trainAI: state.trainAI
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const trainAIDispatchers = bindActionCreators(
		trainAIActionCreators,
		dispatch
	);

	return {
		fetchUserTrainAIAsks: () => {
			trainAIDispatchers.fetchUserTrainAIAsks();
		},
		onVote: (answerIndex, answerId, questionIndex, questionId) => {
			trainAIDispatchers.onVote(
				answerIndex,
				answerId,
				questionIndex,
				questionId
			);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
