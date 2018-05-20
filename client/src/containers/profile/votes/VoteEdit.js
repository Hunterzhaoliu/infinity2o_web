import _ from 'lodash';
import React, { Component } from 'react';
import * as voteEditActionCreators from '../../../actions/profile/voteEdit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col, Button, Icon, Card } from 'antd';

class VoteEdit extends Component {
	onPressPage(displayPage) {
		this.props.onPressPage(displayPage);
	}

	renderFetchIcon(index) {
		const { voteEdit } = this.props;
		if (voteEdit.fetchState[index] === 'start') {
			return <Icon type="loading" />;
		} else if (voteEdit.fetchState[index] === 'done') {
			return <Icon type="check" />;
		} else if (voteEdit.fetchState[index] === 'error') {
			return <Icon type="warning" />;
		}
	}

	onPressAsk(mongoDBAskId, index, mongoDBAnswerId) {
		this.props.onPressAsk(mongoDBAskId, index, mongoDBAnswerId);
	}

	/**
	 * @param num The number to round
	 * @param precision The number of decimal places to preserve
	 */
	roundUp(num, precision) {
		precision = Math.pow(10, precision);
		return Math.ceil(num * precision) / precision;
	}

	renderPagination() {
		const { colorTheme, profile, voteEdit } = this.props;

		let numberOfItems = 0;
		if (profile.asks != null) {
			numberOfItems = profile.asks.votes.length;
		}
		console.log('numberOfItems = ', numberOfItems);
		const numberOfButtons = this.roundUp(numberOfItems / 8, 0);
		return _.map(new Array(numberOfButtons), (pageButton, index) => {
			let textColor = colorTheme.text5Color;
			const displayPage = index + 1;
			if (voteEdit.page === displayPage) {
				textColor = colorTheme.text1Color;
			}
			return (
				<Col
					key={index}
					style={{
						padding: '0px 3px'
					}}
				>
					<Button
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: textColor
						}}
						onClick={e => this.onPressPage(displayPage)}
					>
						{displayPage}
					</Button>
				</Col>
			);
		});
	}

	renderVotes() {
		const { colorTheme, profile, voteEdit } = this.props;

		const PER_PAGE = 8;
		if (profile.asks != null) {
			let i = 0;
			let f = PER_PAGE;
			if (voteEdit.page !== 1) {
				i = (voteEdit.page - 1) * PER_PAGE;
				f = voteEdit.page * PER_PAGE;
			}

			const newestVotes = profile.asks.votes.slice(i, f).reverse();
			return _.map(newestVotes, (vote, index) => {
				return (
					<Row key={index} type="flex" justify="start" align="middle">
						<Col
							style={{
								padding: '0px 0px 8px'
							}}
							span={24}
						>
							<Button
								style={{
									borderColor: colorTheme.text8Color,
									background: colorTheme.text8Color,
									color: colorTheme.text3Color
								}}
								onClick={e =>
									this.onPressAsk(
										vote._askId,
										index,
										vote._answerId
									)
								}
							>
								<p
									style={{
										padding: '4px 0px 0px',
										color: colorTheme.text3Color
									}}
								>
									{vote.question}{' '}
									{this.renderFetchIcon(index)}
								</p>
							</Button>
						</Col>
					</Row>
				);
			});
		}
	}

	renderRevoteStats(answerObject) {
		const { colorTheme, voteEdit } = this.props;
		if (voteEdit.askToRevote.totalRevotes === 0) {
			return (
				<div>
					<div
						style={{
							color: colorTheme.keyText2Color
						}}
					>
						{'0.0%'}
					</div>
					<div
						style={{
							color: colorTheme.keyText7Color
						}}
					>
						{'0.0%'}
					</div>
				</div>
			);
		}
		return (
			<div>
				<div
					style={{
						color: colorTheme.keyText2Color
					}}
				>
					{String(
						(
							answerObject.votesIn /
							voteEdit.askToRevote.totalRevotes *
							100
						).toFixed(1)
					) + '%'}
				</div>
				<div
					style={{
						color: colorTheme.keyText7Color
					}}
				>
					{String(
						(
							answerObject.votesOut /
							voteEdit.askToRevote.totalRevotes *
							100
						).toFixed(1)
					) + '%'}
				</div>
			</div>
		);
	}

	onRevote(
		mongoDBAskId,
		mongoDBAnswerId,
		previousMongoDBAnswerId,
		answerIndex,
		newAnswer,
		currentMongoDBAnswerId
	) {
		this.props.onRevote(
			mongoDBAskId,
			mongoDBAnswerId,
			previousMongoDBAnswerId,
			answerIndex,
			newAnswer,
			currentMongoDBAnswerId
		);
	}

	renderSaveIcon(saveState, saveIndex) {
		if (saveState[saveIndex] === 'start') {
			return <Icon type="loading" />;
		} else if (saveState[saveIndex] === 'done') {
			return <Icon type="check" />;
		} else if (saveState[saveIndex] === 'error') {
			return <Icon type="warning" />;
		}
	}

	renderAnswers(answers, isDisplayingAskStats) {
		const { colorTheme, voteEdit } = this.props;
		return _.map(answers, (answerObject, answerIndex) => {
			// displaying actual answers
			let displayAnswer;
			if (answerObject !== null) {
				displayAnswer = answerObject.answer;
			}

			// displaying the change in voted answer button color
			const currentAnswerId = answers[answerIndex]._id;

			let displayAnswerButtonColor = colorTheme.text7Color;

			if (
				voteEdit.currentMongoDBAnswerId !== null &&
				voteEdit.currentMongoDBAnswerId === currentAnswerId
			) {
				displayAnswerButtonColor = colorTheme.keyText7Color;
			} else if (
				voteEdit.currentMongoDBAnswerId === null &&
				voteEdit.previousMongoDBAnswerId === currentAnswerId
			) {
				displayAnswerButtonColor = colorTheme.keyText7Color;
			}

			return (
				<Row
					type="flex"
					justify="space-around"
					align="middle"
					style={{ padding: '8px 0px 0px' }}
					key={answerIndex}
				>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 14 }}
						md={{ span: 14 }}
						lg={{ span: 14 }}
						xl={{ span: 14 }}
						style={{
							textAlign: 'center',
							color: colorTheme.text2Color
						}}
					>
						<Button
							style={{
								borderColor: displayAnswerButtonColor,
								background: displayAnswerButtonColor,
								color: colorTheme.text2Color
							}}
							onClick={e =>
								this.onRevote(
									voteEdit.askToRevote._id,
									currentAnswerId,
									voteEdit.previousMongoDBAnswerId,
									answerIndex,
									displayAnswer,
									voteEdit.currentMongoDBAnswerId
								)
							}
						>
							{displayAnswer}
							{this.renderSaveIcon(
								voteEdit.revoteSaveState,
								answerIndex
							)}
						</Button>
					</Col>
					<Col
						xs={{ span: 6 }}
						sm={{ span: 4 }}
						md={{ span: 4 }}
						lg={{ span: 4 }}
						xl={{ span: 4 }}
						style={{
							textAlign: 'center',
							color: colorTheme.text2Color
						}}
					>
						{String(
							(
								answerObject.votes /
								voteEdit.askToRevote.totalVotes *
								100
							).toFixed(1)
						) + '%'}
					</Col>
					<Col
						xs={{ span: 6 }}
						sm={{ span: 6 }}
						md={{ span: 6 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
						style={{
							textAlign: 'center'
						}}
					>
						{this.renderRevoteStats(answerObject)}
					</Col>
				</Row>
			);
		});
	}

	renderAskToRevote() {
		const { colorTheme, voteEdit } = this.props;

		if (voteEdit.askToRevote !== null) {
			return (
				<Card
					sm={{ span: 24 }}
					md={{ span: 24 }}
					lg={{ span: 24 }}
					xl={{ span: 12 }}
					style={{
						borderColor: colorTheme.text8Color,
						background: colorTheme.text8Color,
						color: colorTheme.text2Color
					}}
				>
					<h3
						style={{
							textAlign: 'center',
							color: colorTheme.text2Color
						}}
					>
						{voteEdit.askToRevote.question}
					</h3>
					<p
						style={{
							textAlign: 'center',
							color: colorTheme.text3Color
						}}
					>
						{voteEdit.askToRevote.totalVotes + ' vote(s)'}
					</p>
					<p
						style={{
							textAlign: 'center',
							color: colorTheme.keyText2Color
						}}
					>
						{voteEdit.askToRevote.totalRevotes + ' revote(s)'}
					</p>
					<Row
						type="flex"
						justify="space-around"
						align="middle"
						style={{ padding: '8px 0px 0px' }}
					>
						<Col span={14}>
							<p
								style={{
									textAlign: 'center',
									color: colorTheme.text4Color
								}}
							>
								Answer
							</p>
						</Col>
						<Col span={4}>
							<p
								style={{
									textAlign: 'center',
									color: colorTheme.text4Color
								}}
							>
								Vote %
							</p>
						</Col>
						<Col span={6}>
							<div
								style={{
									textAlign: 'center',
									color: colorTheme.keyText2Color
								}}
							>
								Revote In %
							</div>
							<div
								style={{
									textAlign: 'center',
									color: colorTheme.keyText7Color
								}}
							>
								Revote Out %
							</div>
						</Col>
					</Row>
					{this.renderAnswers(voteEdit.askToRevote.answers, true)}
				</Card>
			);
		} else {
			return;
		}
	}

	render() {
		//console.log('this.props inside VoteEdit', this.props);

		return (
			<div>
				<Row type="flex" justify="start" align="top">
					<Col
						sm={{ span: 12 }}
						md={{ span: 12 }}
						lg={{ span: 12 }}
						xl={{ span: 12 }}
					>
						{this.renderVotes()}
					</Col>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 24 }}
						md={{ span: 21 }}
						lg={{ span: 15 }}
						xl={{ span: 12 }}
					>
						{this.renderAskToRevote()}
					</Col>
				</Row>
				<Row
					style={{
						padding: '10px 0px 0px'
					}}
					type="flex"
					justify="start"
					align="middle"
				>
					{this.renderPagination()}
				</Row>
			</div>
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
		profile: state.profile,
		voteEdit: state.voteEdit
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const voteEditDispatchers = bindActionCreators(
		voteEditActionCreators,
		dispatch
	);

	return {
		onPressPage: newPage => {
			voteEditDispatchers.onPressPage(newPage);
		},
		onPressAsk: (mongoDBAskId, index, mongoDBAnswerId) => {
			voteEditDispatchers.onPressAsk(
				mongoDBAskId,
				index,
				mongoDBAnswerId
			);
		},
		onRevote: (
			mongoDBAskId,
			mongoDBAnswerId,
			previousMongoDBAnswerId,
			answerIndex,
			newAnswer,
			currentMongoDBAnswerId
		) => {
			voteEditDispatchers.onRevote(
				mongoDBAskId,
				mongoDBAnswerId,
				previousMongoDBAnswerId,
				answerIndex,
				newAnswer,
				currentMongoDBAnswerId
			);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteEdit);
