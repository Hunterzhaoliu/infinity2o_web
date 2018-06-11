import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sortingHatActionCreators from '../../actions/sorting_hat/sortingHat';
import * as landingActionCreators from '../../actions/landing';
import { bindActionCreators } from 'redux';
import {
	GREY_8,
	GREY_7,
	GREY_3,
	GREY_2,
	RED_ORANGE_3
} from '../styles/ColorConstants';
import { Button, Card, Col, Layout, Row, Icon, Modal } from 'antd';
const { Content } = Layout;

class InputVote extends Component {
	state = {
		visible: false
	};

	componentWillMount() {
		// run once before first render()
	}

	onVote(answerIndex, askIndex, askId) {
		const { sortingHat, history, mongoDBUserId } = this.props;
		//console.log('onVote this.props = ', this.props);
		// now we know which answer user pressed so let's pass the answesId too
		const ask = sortingHat.current4DisplayedAsks[askIndex];
		const answerId = ask.answers[answerIndex]._id;

		const isRevote = askIndex === sortingHat.recentVotedAskIndex;
		if (!isRevote && sortingHat.recentVotedAskIndex !== null) {
			this.props.onNextAsk(
				sortingHat.nextAsks,
				sortingHat.recentVotedAskIndex,
				mongoDBUserId
			);
		}
		this.props.onVote(
			answerIndex,
			answerId,
			askIndex,
			askId,
			history,
			mongoDBUserId
		);
	}

	onNextAsk(removeAskIndex) {
		const { sortingHat, mongoDBUserId } = this.props;
		this.props.onNextAsk(
			sortingHat.nextAsks,
			removeAskIndex,
			mongoDBUserId
		);
	}

	renderNextAskButton(askIndex, isDisplayingAskStats) {
		const { colorTheme, loggedInState } = this.props;

		if (loggedInState === 'not_logged_in') {
			return;
		} else {
			return (
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
			);
		}
	}

	renderModal() {
		return (
			<Modal
				visible={visible}
				title="Congrats on your 1st vote!"
				footer={[
					<Button key="back">Return</Button>,
					<Button key="submit" type="primary">
						Submit
					</Button>
				]}
			>
				<p>To save your vote login with</p>
			</Modal>
		);
	}

	onVoteLanding(answerIndex, askIndex) {
		const { landing } = this.props;
		const ask = landing.landingAsks[askIndex];
		const answerId = ask.answers[answerIndex]._id;
		if (landing.numberOfLandingVotes === 0) {
			this.setState({
				visible: true
			});
		}

		this.props.onVoteLanding(answerIndex, answerId, askIndex);
	}

	renderAnswerButton(
		displayAnswerButtonColor,
		answerButtonTextColor,
		answerIndex,
		askIndex,
		askId,
		displayAnswer,
		sortingHat,
		isDisplayingSaveIcon
	) {
		const { loggedInState } = this.props;

		if (loggedInState === 'not_logged_in') {
			return (
				<Button
					style={{
						borderColor: displayAnswerButtonColor,
						background: displayAnswerButtonColor,
						color: answerButtonTextColor
					}}
					onClick={e => this.onVoteLanding(answerIndex, askIndex)}
				>
					{displayAnswer}
				</Button>
			);
		} else {
			return (
				<Button
					style={{
						borderColor: displayAnswerButtonColor,
						background: displayAnswerButtonColor,
						color: answerButtonTextColor
					}}
					onClick={e => this.onVote(answerIndex, askIndex, askId)}
				>
					{displayAnswer}
					{this.renderSaveIcon(
						sortingHat.save,
						askIndex,
						isDisplayingSaveIcon
					)}
				</Button>
			);
		}
	}

	renderAnswers(
		answers,
		askIndex,
		ask,
		askId,
		isDisplayingAskStats,
		askTotalVotes
	) {
		const { colorTheme, sortingHat, landing, loggedInState } = this.props;
		let answerButtonColor = colorTheme.text7Color;
		let answerButtonTextColor = colorTheme.text2Color;
		let votedAnswerButtonColor = colorTheme.keyText7Color;
		let votingPlace = sortingHat;
		if (loggedInState === 'not_logged_in') {
			answerButtonColor = GREY_3;
			answerButtonTextColor = GREY_8;
			votedAnswerButtonColor = RED_ORANGE_3;
			votingPlace = landing;
		}

		return _.map(answers, (answerObject, answerIndex) => {
			// displaying actual answers
			let displayAnswer;
			if (answerObject !== null) {
				displayAnswer = answerObject.answer;
			}

			// displaying the change in voted answer button color
			const currentAnswerId = ask.answers[answerIndex]._id;

			let displayAnswerButtonColor = answerButtonColor;
			let isDisplayingSaveIcon = false;
			let answerVotes = answerObject.votes;

			// if user has voted on an ask
			if (votingPlace.votes[askId] !== undefined) {
				const votedAnswerId = votingPlace.votes[askId].answerId;
				isDisplayingAskStats = true;
				if (votedAnswerId === currentAnswerId) {
					displayAnswerButtonColor = votedAnswerButtonColor;
					isDisplayingSaveIcon = true;
				}
			}

			return (
				<Row style={{ padding: '8px 0px 0px' }} key={answerIndex}>
					<Col span={this.renderSpanChange(isDisplayingAskStats)}>
						{this.renderAnswerButton(
							displayAnswerButtonColor,
							answerButtonTextColor,
							answerIndex,
							askIndex,
							askId,
							displayAnswer,
							votingPlace,
							isDisplayingSaveIcon
						)}
					</Col>
					<Col
						style={{
							padding: '5px 0px 0px'
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

	getHeightBetweenCards(fourAsks, askIndex) {
		const { windowWidth } = this.props;
		if (windowWidth >= 1200 && (askIndex === 0 || askIndex === 1)) {
			// to display to second Ask with the same height as the first Ask
			const numberOfAsOn1stAsk = fourAsks[0].answers.length;
			let numberOfAsOn2ndAsk = 0;
			if (fourAsks.length > 1) {
				numberOfAsOn2ndAsk = fourAsks[1].answers.length;
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
		const { colorTheme, sortingHat, landing, loggedInState } = this.props;

		let fourAsks;
		let cardColor = colorTheme.text8Color;
		let cardTextColor = colorTheme.text2Color;
		let voteColor = colorTheme.text3Color;
		if (loggedInState === 'not_logged_in') {
			fourAsks = landing.landingAsks;
			cardColor = GREY_2;
			cardTextColor = GREY_8;
			voteColor = GREY_7;
		} else {
			fourAsks = sortingHat.current4DisplayedAsks;
		}

		if (fourAsks.length > 0) {
			return _.map(fourAsks, (Ask, askIndex) => {
				const heightBetweenCards = this.getHeightBetweenCards(
					fourAsks,
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
					if (
						sortingHat.votes[askId] !== undefined ||
						landing.votes[askId] !== undefined
					) {
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
									borderColor: cardColor,
									background: cardColor,
									color: cardTextColor
								}}
								hoverable
							>
								<h3
									style={{
										color: cardTextColor
									}}
								>
									{displayQuestion}
								</h3>
								<div
									style={{
										color: voteColor
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
								{this.renderNextAskButton(
									askIndex,
									isDisplayingAskStats
								)}
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
					Looks like you've done a lot of voting; you should ask a
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
			return String(askTotalVotes) + ' vote(s)';
		}
	}

	renderAskCategories() {
		const {
			onNewestAsks,
			onPopularAsks,
			onControversialAsks,
			theme
		} = this.props;

		return (
			<Row
				type="flex"
				justify="center"
				align="middle"
				style={{
					padding: '0px 0px 15px' // top left&right bottom
				}}
			>
				<Col
					sm={{ span: 7 }}
					md={{ span: 6 }}
					lg={{ span: 5 }}
					xl={{ span: 4 }}
				>
					<Button
						style={{
							borderColor: theme.newestButtonColor,
							background: theme.newestButtonColor,
							color: theme.newestButtonTextColor
						}}
						onClick={onNewestAsks}
					>
						Newest
					</Button>
				</Col>
				<Col
					sm={{ span: 7 }}
					md={{ span: 6 }}
					lg={{ span: 5 }}
					xl={{ span: 4 }}
				>
					<Button
						style={{
							borderColor: theme.popularButtonColor,
							background: theme.popularButtonColor,
							color: theme.popularButtonTextColor
						}}
						onClick={onPopularAsks}
					>
						Popular
					</Button>
				</Col>
				<Col
					sm={{ span: 8 }}
					md={{ span: 7 }}
					lg={{ span: 6 }}
					xl={{ span: 5 }}
				>
					<Button
						style={{
							borderColor: theme.controversialButtonColor,
							background: theme.controversialButtonColor,
							color: theme.controversialButtonTextColor
						}}
						onClick={onControversialAsks}
					>
						Controversial
					</Button>
				</Col>
			</Row>
		);
	}

	render() {
		const { colorTheme } = this.props;

		return (
			<Content
				style={{
					overflow: 'initial',
					background: colorTheme.backgroundColor
				}}
			>
				{/* {this.renderAskCategories()} */}
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
		sortingHat: state.sortingHat,
		mongoDBUserId: state.auth.mongoDBUserId,
		windowWidth: state.customHeader.windowWidth,
		theme: state.sortingHat.theme,
		landing: state.landing,
		loggedInState: state.auth.loggedInState
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const sortingHatDispatchers = bindActionCreators(
		sortingHatActionCreators,
		dispatch
	);

	const landingDispatchers = bindActionCreators(
		landingActionCreators,
		dispatch
	);

	return {
		onNewestAsks: () => {
			sortingHatDispatchers.onNewestAsks();
		},
		onPopularAsks: () => {
			sortingHatDispatchers.onPopularAsks();
		},
		onControversialAsks: () => {
			sortingHatDispatchers.onControversialAsks();
		},
		onNextAsk: (nextAsks, removeAskIndex, mongoDBUserId) => {
			sortingHatDispatchers.onNextAsk(
				nextAsks,
				removeAskIndex,
				mongoDBUserId
			);
		},
		onVote: (
			answerIndex,
			answerId,
			askIndex,
			askId,
			history,
			mongoDBUserId
		) => {
			sortingHatDispatchers.onVote(
				answerIndex,
				answerId,
				askIndex,
				askId,
				history,
				mongoDBUserId
			);
		},
		onVoteLanding: (answerIndex, answerId, askIndex) => {
			landingDispatchers.onVoteLanding(answerIndex, answerId, askIndex);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
