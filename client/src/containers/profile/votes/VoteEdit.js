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

	renderPagination() {
		const { colorTheme, profile, voteEdit } = this.props;

		let numberOfItems = 0;
		if (profile.asks != null) {
			numberOfItems = profile.asks.votes.length;
		}

		const numberOfButtons = Math.round(numberOfItems / 8);
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

			const newest5Votes = profile.asks.votes.slice(i, f).reverse();
			return _.map(newest5Votes, (vote, index) => {
				return (
					<Row key={index} type="flex" justify="start" align="middle">
						<Col
							style={{
								padding: '0px 0px 8px'
							}}
							span={12}
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
						<Col span={12}>
							<h4
								style={{
									color: colorTheme.text3Color
								}}
							>
								{vote.selectedAnswer}
							</h4>
						</Col>
					</Row>
				);
			});
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
			let isDisplayingSaveIcon = false;
			let answerVotes = answerObject.votes;

			if (voteEdit.previousMongoDBAnswerId === currentAnswerId) {
				displayAnswerButtonColor = colorTheme.keyText7Color;
				isDisplayingSaveIcon = true;
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
						style={{
							color: colorTheme.text2Color
						}}
					>
						<Button
							style={{
								borderColor: displayAnswerButtonColor,
								background: displayAnswerButtonColor,
								color: colorTheme.text2Color
							}}
							// onClick={e =>
							// 	this.onVote(answerIndex, askIndex, askId)
							// }
						>
							{displayAnswer}
							{/* {this.renderSaveIcon(
								trainAI.save,
								askIndex,
								isDisplayingSaveIcon
							)} */}
						</Button>
					</Col>
					<Col
						style={{
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
					<Col>
						<div
							style={{
								color: colorTheme.keyText2Color
							}}
						>
							{String(
								(
									-1 /
									voteEdit.askToRevote.totalVotes *
									100
								).toFixed(1)
							) + '%'}
						</div>
						<div
							style={{
								color: colorTheme.keyText4Color
							}}
						>
							{String(
								(
									-1 /
									voteEdit.askToRevote.totalVotes *
									100
								).toFixed(1)
							) + '%'}
						</div>
					</Col>
				</Row>
			);
		});
	}

	renderAskToRevote() {
		const { colorTheme, profile, voteEdit } = this.props;

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
						{'Total Votes: ' + voteEdit.askToRevote.totalVotes}
					</p>
					<Row
						type="flex"
						justify="space-around"
						align="middle"
						style={{ padding: '8px 0px 0px' }}
					>
						<Col>
							<p
								style={{
									textAlign: 'center',
									color: colorTheme.text4Color
								}}
							>
								Answer
							</p>
						</Col>
						<Col>
							<p
								style={{
									textAlign: 'center',
									color: colorTheme.text4Color
								}}
							>
								Vote %
							</p>
						</Col>
						<Col>
							<div
								style={{
									textAlign: 'center',
									color: colorTheme.text4Color
								}}
							>
								Revote In %
							</div>
							<div
								style={{
									textAlign: 'center',
									color: colorTheme.text4Color
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
					<Col span={12}>{this.renderVotes()}</Col>
					<Col span={12}>{this.renderAskToRevote()}</Col>
				</Row>
				<Row type="flex" justify="start" align="middle">
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
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteEdit);
