import React, { Component } from "react";
import { connect } from "react-redux";
import * as matchesActionCreators from "../../actions/matches/matches";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import { MINIMUM_VOTES_TO_GET_IMMEDIATE_MATCH } from "../../utils/constants";
import "./Matches.css";
import { Layout, Row, Col, Progress, Icon } from "antd";
import MatchCards from "./MatchCards";
const { Content } = Layout;

class Matches extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onMatches();
		this.props.fetchUserMatches(this.props.mongoDBUserId);
	}

	componentWillReceiveProps(nextProps) {
		// basicMatchInfo contains the match Ids and whether they have been seen
		if (nextProps.basicMatchInfo !== this.props.basicMatchInfo) {
			this.props.checkIfMatchSeen(
				nextProps.basicMatchInfo[0],
				nextProps.mongoDBUserId
			);
		}
	}

	renderMatches() {
		const {
			colorTheme,
			matches,
			history,
			totalUserVotesAcrossAllSessions,
			runningAthenaForUser
		} = this.props;

		document.documentElement.style.setProperty(
			`--text1Color`,
			colorTheme.text1Color
		);
		document.documentElement.style.setProperty(
			`--text2Color`,
			colorTheme.text2Color
		);
		document.documentElement.style.setProperty(
			`--text6Color`,
			colorTheme.text6Color
		);
		document.documentElement.style.setProperty(
			`--text7Color`,
			colorTheme.text7Color
		);

		const hasMatches = matches.current1DisplayedMatches.length > 0;
		if (hasMatches) {
			const match = matches.current1DisplayedMatches[0];
			return (
				<Col xl={{ span: 7 }}>
					<MatchCards match={match} history={history} />
				</Col>
			);
		} else if (runningAthenaForUser) {
			return (
				<Col>
					<h4
						style={{
							color: colorTheme.text2Color,
							fontFamily: "Overpass",
							fontSize: "24px",
							lineHeight: 1,
							marginBottom: 0
						}}
					>
						We will have matches for you in a moment{" "}
						<Icon type="loading" />
					</h4>
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
			const percentVotes = (100 / 8) * totalUserVotesAcrossAllSessions;
			return (
				<Col
					sm={{ span: 24 }}
					md={{ span: 22 }}
					lg={{ span: 18 }}
					xl={{ span: 14 }}
				>
					<h4
						style={{
							color: colorTheme.text3Color,
							fontFamily: "Overpass",
							fontSize: "24px",
							lineHeight: 1,
							marginBottom: 0
						}}
					>
						Recieve your first 2 matches by voting on 8 questions in
						Sorting Hat
					</h4>
					<h6
						style={{
							color: colorTheme.text4Color,
							fontFamily: "Overpass",
							fontSize: "18px",
							lineHeight: 1,
							marginBottom: 0
						}}
					>
						You have {votesToGo} to go!
					</h6>
					<Progress
						percent={percentVotes}
						showInfo={false}
						status="active"
					/>
				</Col>
			);
		} else {
			return (
				<h6
					style={{
						color: colorTheme.text3Color,
						fontFamily: "Overpass",
						fontSize: "24px",
						lineHeight: 1,
						marginBottom: 0
					}}
				>
					You're out of matches for today. Vote on questions in
					Sorting Hat to get better matches.
				</h6>
			);
		}
	}

	render() {
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					textAlign: "center",
					padding: "120px 20px 0px",
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="center">
					<Col>
						<h2
							style={{
								color: colorTheme.text2Color,
								fontFamily: "Overpass",
								fontSize: "32px",
								lineHeight: 1,
								marginBottom: 0
							}}
						>
							Best 2 Matches. Every Single Day. At 9 AM.
						</h2>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="top"
					style={{ padding: "45px 0px 0px 0px" }}
				>
					{this.renderMatches()}
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
		totalUserVotesAcrossAllSessions:
			state.matches.totalUserVotesAcrossAllSessions,
		runningAthenaForUser: state.matches.runningAthenaForUser,
		mongoDBUserId: state.auth.mongoDBUserId,
		basicMatchInfo: state.matches.basicMatchInfo
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const matchesDispatchers = bindActionCreators(
		matchesActionCreators,
		dispatch
	);
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		onMatches: () => {
			colorThemeDispatchers.onMatches();
		},
		fetchUserMatches: mongoDBUserId => {
			matchesDispatchers.fetchUserMatches(mongoDBUserId);
		},
		checkIfMatchSeen: (matchNeededToBeChecked, mongoDBUserId) => {
			matchesDispatchers.checkIfMatchSeen(
				matchNeededToBeChecked,
				mongoDBUserId
			);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Matches);
