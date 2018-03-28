import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as matchesActionCreators from '../../actions/matches';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Card, Button } from 'antd';
const { Content } = Layout;

class Matches extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onMatches();
	}

	onNextMatch() {
		this.props.onNextMatch();
	}

	onStartConversation(history) {
		this.props.onStartConversation(history);
	}

	renderMatches() {
		//console.log('in Matches.js this.props = ', this.props);
		const { matches, history } = this.props;

		if (matches.current1DisplayedMatches.length > 0) {
			return _.map(matches.current1DisplayedMatches, match => {
				return (
					<Col
						key={match.name}
						sm={{ span: 10 }}
						md={{ span: 11, offset: 0 }}
						lg={{ span: 9 }}
						xl={{ span: 7 }}
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
									color: this.props.colorTheme.text1Color,
									borderColor: this.props.colorTheme
										.text8Color,
									background: this.props.colorTheme.text8Color
								}}
							>
								<h3
									style={{
										color: this.props.colorTheme.text1Color
									}}
								>
									{match.name}
								</h3>
								<p
									style={{
										color: this.props.colorTheme.text3Color
									}}
								>
									Interests: {match.interests}
								</p>
								<p
									style={{
										color: this.props.colorTheme.text3Color
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
												borderColor: this.props
													.colorTheme.text6Color,
												background: this.props
													.colorTheme.text6Color,
												color: this.props.colorTheme
													.text2Color
											}}
											onClick={e => this.onNextMatch()}
										>
											Next
										</Button>
									</Col>
									<Col span={11}>
										<Button
											style={{
												borderColor: this.props
													.colorTheme.text6Color,
												background: this.props
													.colorTheme.text6Color,
												color: this.props.colorTheme
													.text2Color
											}}
											onClick={e =>
												this.onStartConversation(
													history
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
						color: this.props.colorTheme.text2Color
					}}
				>
					Your out of matches for today. More coming tomorrow :)
				</h3>
			);
		}
	}

	render() {
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h2
					key="1"
					style={{
						color: this.props.colorTheme.text3Color,
						padding: '0% 0% 5%'
					}}
				>
					Every 24 hours our AI generates the best partners for you.
				</h2>
				<Row type="flex" justify="space-between" align="top">
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
		matches: state.matches
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

	return {
		onMatches: () => {
			colorThemeDispatchers.onMatches();
		},
		onNextMatch: () => {
			matchesDispatchers.onNextMatch();
		},
		onStartConversation: history => {
			matchesDispatchers.onStartConversation(history);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
