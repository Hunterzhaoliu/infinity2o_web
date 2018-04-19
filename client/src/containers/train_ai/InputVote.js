import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as trainAIActionCreators from '../../actions/trainAI';
import { bindActionCreators } from 'redux';
import { Button, Card, Col, Layout, Row, Icon, Input } from 'antd';
const Search = Input.Search;
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
							onClick={e =>
								this.onVote(answerIndex, askIndex, askId)
							}
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

	getHeightBetweenCards(current4DisplayedAsks, askIndex) {
		const { windowWidth } = this.props;
		if (windowWidth >= 1200 && (askIndex === 0 || askIndex === 1)) {
			// to display to second Ask with the same height as the first Ask
			const numberOfAsOn1stAsk = current4DisplayedAsks[0].answers.length;
			let numberOfAsOn2ndAsk = 0;
			if (current4DisplayedAsks.length > 1) {
				numberOfAsOn2ndAsk = current4DisplayedAsks[1].answers.length;
			}

			// add height below card on 1st or 2nd Ask to match each other
			const numberOfAsDiffBetween1stAnd2ndAsk =
				numberOfAsOn1stAsk - numberOfAsOn2ndAsk;
			// console.log('askIndex = ', askIndex);
			// console.log(
			// 	'numberOfAsDiffBetween1stAnd2ndAsk = ',
			// 	numberOfAsDiffBetween1stAnd2ndAsk
			// );
			// can equal -2, -1, 0, 1, or 2
			if (askIndex === 0) {
				switch (numberOfAsDiffBetween1stAnd2ndAsk) {
					case -2:
						return '108px';
					case -1:
						return '72px';
					case 0:
						return '36px';
					case 1:
						return '36px';
					case 2:
						return '36px';
					default:
						return '36px';
				}
			} else if (askIndex === 1) {
				switch (numberOfAsDiffBetween1stAnd2ndAsk) {
					case -2:
						return '36px';
					case -1:
						return '36px';
					case 0:
						return '36px';
					case 1:
						return '72px';
					case 2:
						return '108px';
					default:
						return '36px';
				}
			}
		} else {
			return '36px';
		}
	}

	renderQandAs() {
		const { colorTheme, trainAI } = this.props;

		if (trainAI.current4DisplayedAsks.length > 0) {
			return _.map(trainAI.current4DisplayedAsks, (Ask, askIndex) => {
				const heightBetweenCards = this.getHeightBetweenCards(
					trainAI.current4DisplayedAsks,
					askIndex
				);

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
						<Col
							sm={{ span: 24 }}
							md={{ span: 24 }}
							lg={{ span: 24 }}
							xl={{ span: 12 }}
							key={askIndex}
						>
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
									{this.renderTotalVotes(
										askTotalVotes,
										isDisplayingAskStats
									)}
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
										{this.renderAskDoneWord(
											isDisplayingAskStats
										)}
									</Button>
								</Row>
							</Card>
							<Row
								style={{
									padding: '0px 0px ' + heightBetweenCards // top left&right bottom
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
					Looks like you have done a lot of voting, try asking a
					question!
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
					type="flex"
					justify="center"
					align="middle"
					style={{
						padding: '0px 0px 15px' // top left&right bottom
					}}
				>
					<Col span={2}>
						<Button
							key="1"
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text1Color
							}}
						>
							Newest
						</Button>
					</Col>
					<Col span={4}>
						<Button
							key="1"
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text1Color
							}}
						>
							Popular
						</Button>
					</Col>
					<Col span={4}>
						<Button
							key="1"
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text1Color
							}}
						>
							Controversial
						</Button>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="top"
					style={{
						padding: '0px 0px 15px' // top left&right bottom
					}}
				>
					<Col>
						<Search
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.key,
								width: 400
							}}
							placeholder="Search for a question"
							onSearch={value => console.log(value)}
							enterButton
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="top"
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
		mongoDBUserId: state.auth.mongoDBUserId,
		windowWidth: state.customHeader.windowWidth
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
			trainAIDispatchers.onNextAsk(
				nextAsks,
				removeAskIndex,
				mongoDBUserId
			);
		},
		onVote: (answerIndex, answerId, askIndex, askId) => {
			trainAIDispatchers.onVote(answerIndex, answerId, askIndex, askId);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
