import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as trainAIActionCreators from '../../actions/trainAI';
import { bindActionCreators } from 'redux';
import { Button, Card, Col, Layout, Row, Icon } from 'antd';
const { Content } = Layout;

class InputVote extends Component {
	componentWillMount() {
		// run once before first render()
	}

	onVote(answerIndex, askIndex, askId) {
		const { trainAI } = this.props;
		// now we know which answer user pressed so let's pass the answesId too
		const ask = trainAI.current4DisplayedAsks[askIndex];
		const answerId = ask.answers[answerIndex]._id;

		this.props.onVote(answerIndex, answerId, askIndex, askId);
	}

	onNextAsk(removeAskIndex) {
		const { trainAI, mongoDBUserId } = this.props;
		this.props.onNextAsk(trainAI.nextAsks, removeAskIndex, mongoDBUserId);
	}

	renderAnswers(
		answers,
		askIndex,
		ask,
		askId,
		isDisplayingAskStats,
		askTotalVotes
	) {
		const { colorTheme, trainAI } = this.props;
		return _.map(answers, (answerObject, answerIndex) => {
			// displaying actual answers
			let displayAnswer;
			if (answerObject !== null) {
				displayAnswer = answerObject.answer;
			}

			// displaying the change in voted answer button color
			const currentAnswerId = ask.answers[answerIndex]._id;

			let displayAnswerButtonColor = colorTheme.text7Color;
			let isDisplayingSaveIcon = false;
			let answerVotes = answerObject.votes;

			// if user has voted on an ask
			if (trainAI.votes[askId] !== undefined) {
				const votedAnswerId = trainAI.votes[askId].answerId;
				isDisplayingAskStats = true;
				if (votedAnswerId === currentAnswerId) {
					displayAnswerButtonColor = colorTheme.keyText7Color;
					isDisplayingSaveIcon = true;
				}
			}

			return (
				<Row style={{ padding: '8px 0px 0px' }} key={answerIndex}>
					<Col
						style={{
							color: colorTheme.text2Color
						}}
						span={this.renderSpanChange(isDisplayingAskStats)}
					>
						<Button
							style={{
								borderColor: displayAnswerButtonColor,
								background: displayAnswerButtonColor,
								color: colorTheme.text2Color
							}}
							onClick={e => this.onVote(answerIndex, askIndex, askId)}
						>
							{displayAnswer}
							{this.renderSaveIcon(
								trainAI.save,
								askIndex,
								isDisplayingSaveIcon
							)}
						</Button>
					</Col>
					<Col
						style={{
							color: colorTheme.text2Color
						}}
						span={this.renderSpanChange(isDisplayingAskStats)}
					>
						{this.renderAskStats(
							answerVotes,
							askTotalVotes,
							isDisplayingAskStats
						)}
					</Col>
				</Row>
			);
		});
	}

	renderQandAs() {
		const { colorTheme, trainAI } = this.props;

		if (trainAI.current4DisplayedAsks.length > 0) {
			return _.map(trainAI.current4DisplayedAsks, (Ask, askIndex) => {
				let displayQuestion;
				let displayAnswers;

				let askId;
				let askTotalVotes;
				let isDisplayingAskStats = false;

				if (Ask !== null && Ask !== undefined) {
					displayQuestion = Ask.question;
					displayAnswers = Ask.answers;
					askId = Ask._id;
					askTotalVotes = Ask.totalVotes;
					if (trainAI.votes[askId] !== undefined) {
						isDisplayingAskStats = true;
					}
					return (
						<Col span={12} key={askIndex}>
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
								<div
									style={{
										color: colorTheme.text3Color
									}}
								>
									{this.renderTotalVotes(askTotalVotes, isDisplayingAskStats)}
								</div>
								{this.renderAnswers(
									displayAnswers,
									askIndex,
									Ask,
									askId,
									isDisplayingAskStats,
									askTotalVotes
								)}
								<Row style={{ padding: '8px 0px 0px' }}>
									<Button
										style={{
											borderColor: colorTheme.text7Color,
											background: colorTheme.text7Color,
											color: colorTheme.text2Color
										}}
										onClick={e => this.onNextAsk(askIndex)}
									>
										{this.renderAskDoneWord(isDisplayingAskStats)}
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
				}
			});
		} else {
			return (
				<h3
					style={{
						color: colorTheme.text2Color
					}}
				>
					Looks like you have done a lot of voting, try asking a question!
				</h3>
			);
		}
	}

	renderSaveIcon(saveState, saveIndex, isDisplaying) {
		if (isDisplaying) {
			if (saveState[saveIndex] === 'save_start') {
				return <Icon type="loading" />;
			} else if (saveState[saveIndex] === 'save_done') {
				return <Icon type="check" />;
			} else if (saveState[saveIndex] === 'save_error') {
				return <Icon type="warning" />;
			}
		}
	}

	renderAskStats(answerVotes, askTotalVotes, isDisplayingAskStats) {
		if (isDisplayingAskStats) {
			return String((answerVotes / askTotalVotes * 100).toFixed(1)) + '%';
		}
	}

	renderSpanChange(isDisplayingAskStats) {
		if (isDisplayingAskStats) {
			return 12;
		}
	}

	renderAskDoneWord(isDisplayingAskStats) {
		if (isDisplayingAskStats) {
			return 'Next Question';
		} else {
			return 'Pass';
		}
	}

	renderTotalVotes(askTotalVotes, isDisplayingAskStats) {
		if (isDisplayingAskStats) {
			return 'Total Votes:  ' + String(askTotalVotes);
		}
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
		trainAI: state.trainAI,
		mongoDBUserId: state.auth.mongoDBUserId
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
		onNextAsk: (nextAsks, removeAskIndex, mongoDBUserId) => {
			trainAIDispatchers.onNextAsk(nextAsks, removeAskIndex, mongoDBUserId);
		},
		onVote: (answerIndex, answerId, askIndex, askId) => {
			trainAIDispatchers.onVote(answerIndex, answerId, askIndex, askId);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
