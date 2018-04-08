import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as matchesActionCreators from '../../actions/matches';
import * as profileActionCreators from '../../actions/profile';
import * as authActionCreators from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Card, Button, Popconfirm, message } from 'antd';
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

	onStartConversation(history, matchName, matchId) {
		const { neuronsInBillions, mongoDBUserId } = this.props;
		if (neuronsInBillions >= 3) {
			this.props.decrementNeurons(3, mongoDBUserId);
			this.props.onStartConversation(history, matchName, matchId);
		}
	}

	renderPaymentOptions() {}

	renderSayHi() {
		const { neuronsInBillions, colorTheme } = this.props;
		if (neuronsInBillions < 3) {
			return (
				<Popconfirm>
					<p
						style={{
							padding: '3px 0px 0px',
							color: colorTheme.text2Color
						}}
					>
						Say Hi :)
					</p>
				</Popconfirm>
			);
		} else {
			return (
				<p
					style={{
						padding: '3px 0px 0px',
						color: colorTheme.text2Color
					}}
				>
					Say Hi :)
				</p>
			);
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
								<Row type="flex" justify="space-between" align="top">
									<Col span={11}>
										<Button
											style={{
												borderColor: colorTheme.text6Color,
												background: colorTheme.text6Color,
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
												borderColor: colorTheme.keyText6Color,
												background: colorTheme.keyText6Color,
												color: colorTheme.text2Color
											}}
											onClick={e =>
												this.onStartConversation(history, match.name, match.id)
											}
										>
											{this.renderSayHi()}
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
					Your out of matches for today. Check out Train AI for better matches
					:)
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
					Every 24 hours at 9 AM Central Time our AI generates the best partners
					for you.
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
				<Row type="flex" justify="center" align="top">
					<Col
						sm={{ span: 0 }}
						md={{ span: 1 }}
						lg={{ span: 3 }}
						xl={{ span: 5 }}
					/>
					{this.renderPaymentOptions()}
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
			profileDispatchers.decrementNeurons(neuronsInBillions, mongoDBUserId);
		},
		fetchUserProfile: () => {
			authDispatchers.fetchUserProfile();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
