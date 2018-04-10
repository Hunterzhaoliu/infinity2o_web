import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as matchesActionCreators from '../../actions/matches';
import * as profileActionCreators from '../../actions/profile';
import * as authActionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import Options from '../payment/Options';

import {
	NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS,
	NUMBER_NEURONS_TO_SAY_HI
} from '../payment/prices';
import { Layout, Row, Col, Card, Button, message } from 'antd';
const { Content } = Layout;

class Matches extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserProfile();
		this.props.onMatches();
	}

	onNextMatch() {
		this.props.onNextMatch();
	}

	displayNeedToPurchaseMoreNeurons = () => {
		message.warn(
			'You need ' +
				NUMBER_NEURONS_TO_SAY_HI +
				" Million neurons to 'Say Hi'. You can purchase neurons below or in Profile.",
			10
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

	renderMatches() {
		//console.log('in Matches.js this.props = ', this.props);
		const { colorTheme, matches, history } = this.props;
		if (matches.current1DisplayedMatches.length > 0) {
			return _.map(matches.current1DisplayedMatches, match => {
				return (
					<Col
						key={match.name}
						style={{
							height: '50%'
						}}
					>
						<Row type="flex" justify="center" align="top">
							<Card
								hoverable={true}
								borderded="false"
								loading={false}
								style={{
									width: '260px',
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
									Interests: {match.interests}
								</p>
								<p
									style={{
										color: colorTheme.text3Color
									}}
								>
									Total User Votes: {match.totalUserVotes}
								</p>
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
											onClick={e => this.onNextMatch()}
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
											Say Hi :)
										</Button>
									</Col>
								</Row>
							</Card>
						</Row>
					</Col>
				);
			});
		} else {
			return (
				<h3
					style={{
						color: colorTheme.text2Color
					}}
				>
					Your out of matches for today. Check out Train AI for better
					matches :)
				</h3>
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
				<h2
					key="1"
					style={{
						color: colorTheme.text3Color
					}}
				>
					Every day at 9 AM Central Time, our AI generates the best
					partners for you.
				</h2>
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
				{this.renderPaymentOptions()}
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
		mongoDBUserId: state.auth.mongoDBUserId
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
