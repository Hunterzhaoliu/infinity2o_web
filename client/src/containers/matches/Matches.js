import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as matchesActionCreators from '../../actions/matches/matches';
import * as profileActionCreators from '../../actions/profile/profile';
import * as authActionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Options from '../payment/Options';
import { MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH } from '../../utils/constants';
import {
	NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS,
	NUMBER_NEURONS_TO_SAY_HI
} from '../payment/prices';
import './Matches.css';
import { Layout, Row, Col, Card, Button, message, Progress, Icon } from 'antd';
const { Content } = Layout;

class Matches extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onMatches();
	}

	onNextMatch() {
		this.props.onNextMatch();
	}

	displayNeedToPurchaseMoreNeurons = () => {
		message.warn(
			'You need ' +
				NUMBER_NEURONS_TO_SAY_HI +
				" Million neurons to 'Say Hi'. You can get neurons by voting or asking questions with the Sorting Hat.",
			5
		);
	};

	renderPaymentOptions() {
		const { colorTheme, neuronsInBillions } = this.props;
		if (neuronsInBillions < NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS) {
			return (
				<div>
					<Row type="flex" justify="center" align="middle">
						<Col>
							<h2
								style={{
									textAlign: 'center',
									padding: '10px 0px 0px',
									color: colorTheme.text3Color
								}}
							>
								Purchase Neurons:
							</h2>
						</Col>
					</Row>
					<Options />
				</div>
			);
		}
	}

	onStartConversation(history, matchName, matchId) {
		const { neuronsInBillions, mongoDBUserId } = this.props;
		if (neuronsInBillions >= NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS) {
			this.props.decrementNeurons(
				NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS,
				mongoDBUserId
			);
			this.props.onStartConversation(history, matchName, matchId);
		} else {
			this.displayNeedToPurchaseMoreNeurons();
		}
	}

	formatInterests(interests) {
		let formattedInterests = '';
		let i;
		for (i = 0; i < interests.length; i++) {
			formattedInterests += interests[i];
			if (i !== interests.length - 1) {
				formattedInterests += ', ';
			}
		}
		return formattedInterests;
	}

	renderLinks(match) {
		const { colorTheme } = this.props;
		const linkData = [
			{
				display: 'LinkedIn',
				href: match.linkedInPublicProfileUrl
			},
			{
				display: 'Github',
				href: match.githubPublicProfileUrl
			},
			{
				display: 'Website',
				href: match.websiteUrl
			}
		];
		return _.map(linkData, (link, index) => {
			return (
				<Row
					style={{ padding: '0px 0px 15px' }}
					key={index}
					type="flex"
					justify="center"
					align="top"
				>
					<Col>
						<Button
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						>
							<a target="_blank" href={link['href']}>
								{link['display']}
							</a>
						</Button>
					</Col>
				</Row>
			);
		});
	}

	renderMatches() {
		//console.log('in Matches.js this.props = ', this.props);
		const {
			colorTheme,
			matches,
			history,
			totalUserVotesAcrossAllSessions,
			runningAthenaForUser
		} = this.props;

		document.documentElement.style.setProperty(
			`--progress-color`,
			colorTheme.keyText7Color
		);

		document.documentElement.style.setProperty(
			`--progress-remaining-color`,
			colorTheme.text8Color
		);

		const hasMatches = matches.current1DisplayedMatches.length > 0;

		if (hasMatches) {
			return _.map(matches.current1DisplayedMatches, match => {
				return (
					<Col key={match.name}>
						<Row type="flex" justify="center" align="top">
							<Col>
								<Card
									hoverable={true}
									borderded="false"
									loading={false}
									style={{
										width: '300px',
										color: colorTheme.text1Color,
										borderColor: colorTheme.text8Color,
										background: colorTheme.text8Color
									}}
								>
									<h3
										style={{
											color: colorTheme.text1Color
										}}
									>
										{match.name}
									</h3>
									<p
										style={{
											color: colorTheme.text3Color
										}}
									>
										{match.totalUserVotes} vote(s)
									</p>
									<p
										style={{
											color: colorTheme.text3Color
										}}
									>
										Interests:{' '}
										{this.formatInterests(match.interests)}
									</p>
									{this.renderLinks(match)}
									<Row
										type="flex"
										justify="space-between"
										align="top"
									>
										<Col span={11}>
											<Button
												style={{
													borderColor:
														colorTheme.text7Color,
													background:
														colorTheme.text7Color,
													color: colorTheme.text2Color
												}}
												onClick={e =>
													this.onNextMatch()
												}
											>
												Next
											</Button>
										</Col>
										<Col span={11}>
											<Button
												style={{
													borderColor:
														colorTheme.keyText7Color,
													background:
														colorTheme.keyText7Color,
													color: colorTheme.text1Color
												}}
												onClick={e =>
													this.onStartConversation(
														history,
														match.name,
														match.id
													)
												}
											>
												Say Hi
											</Button>
										</Col>
									</Row>
								</Card>
							</Col>
						</Row>
					</Col>
				);
			});
		} else if (runningAthenaForUser) {
			return (
				<Col>
					<h2
						style={{
							color: colorTheme.text2Color
						}}
					>
						We'll have matches for you in a moment{' '}
						<Icon type="loading" />
					</h2>
				</Col>
			);
		} else if (
			totalUserVotesAcrossAllSessions <
			MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH
		) {
			// display progress bar showing user needs to vote X more times
			// before we run minerva for them
			const votesToGo =
				MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH -
				totalUserVotesAcrossAllSessions;
			const percentVotes = 100 / 8 * totalUserVotesAcrossAllSessions;
			return (
				<Col
					sm={{ span: 24 }}
					md={{ span: 22 }}
					lg={{ span: 18 }}
					xl={{ span: 14 }}
				>
					<h2
						style={{
							color: colorTheme.text3Color
						}}
					>
						Recieve your first 2 matches by voting on 8 questions in
						Train AI
					</h2>
					<h3
						style={{
							color: colorTheme.text4Color
						}}
					>
						You have {votesToGo} to go!
					</h3>
					<Progress
						percent={percentVotes}
						showInfo={false}
						status="active"
					/>
				</Col>
			);
		} else {
			return (
				<Col
					sm={{ span: 24 }}
					md={{ span: 22 }}
					lg={{ span: 18 }}
					xl={{ span: 14 }}
				>
					<h2
						style={{
							color: colorTheme.text3Color
						}}
					>
						You're out of matches for today. Vote on questions in
						Train AI to get better matches.
					</h2>
					<h3
						style={{
							color: colorTheme.text4Color
						}}
					>
						Every day at 9 AM Central Time, our artificial
						intelligence (AI) generates the 2 best study partners
						for you.
					</h3>
				</Col>
			);
		}
	}

	render() {
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="center" align="top">
					<Col
						sm={{ span: 0 }}
						md={{ span: 1 }}
						lg={{ span: 3 }}
						xl={{ span: 5 }}
					/>
					<Col
						sm={{ span: 24 }}
						md={{ span: 22 }}
						lg={{ span: 18 }}
						xl={{ span: 14 }}
					>
						<h2
							style={{
								color: colorTheme.text2Color
							}}
						>
							We use your profile to give you the 2 best matches
							everyday
						</h2>
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 1 }}
						lg={{ span: 3 }}
						xl={{ span: 5 }}
					/>
				</Row>
				<Row type="flex" justify="center" align="top">
					<Col
						sm={{ span: 0 }}
						md={{ span: 1 }}
						lg={{ span: 3 }}
						xl={{ span: 5 }}
					/>
					{this.renderMatches()}
					<Col
						sm={{ span: 0 }}
						md={{ span: 1 }}
						lg={{ span: 3 }}
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
		matches: state.matches,
		neuronsInBillions: state.profile.payment.neuronsInBillions,
		mongoDBUserId: state.auth.mongoDBUserId,
		totalUserVotesAcrossAllSessions:
			state.matches.totalUserVotesAcrossAllSessions,
		runningAthenaForUser: state.matches.runningAthenaForUser
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

	const matchesDispatchers = bindActionCreators(
		matchesActionCreators,
		dispatch
	);

	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	const authDispatchers = bindActionCreators(authActionCreators, dispatch);

	return {
		onMatches: () => {
			colorThemeDispatchers.onMatches();
		},
		onNextMatch: () => {
			matchesDispatchers.onNextMatch();
		},
		onStartConversation: (history, matchName, matchId) => {
			matchesDispatchers.onStartConversation(history, matchName, matchId);
		},
		decrementNeurons: (neuronsInBillions, mongoDBUserId) => {
			profileDispatchers.decrementNeurons(
				neuronsInBillions,
				mongoDBUserId
			);
		},
		fetchUserProfile: () => {
			authDispatchers.fetchUserProfile();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
