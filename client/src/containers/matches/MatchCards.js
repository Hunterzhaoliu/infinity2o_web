import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Card, Avatar, message } from "antd";
import * as matchesActionCreators from "../../actions/matches/matches";
import * as profileActionCreators from "../../actions/profile/profile";
import { bindActionCreators } from "redux";
import LinkedIn from "../profileInformation/LinkedIn";
import Github from "../profileInformation/Github";
import Interests from "../profileInformation/Interests";
import TimeZone from "../profileInformation/TimeZone";
import {
	NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS,
	NUMBER_NEURONS_TO_SAY_HI
} from "../payment/prices";

class MatchCards extends Component {
	onNextMatch() {
		const { nextMatches, basicMatchInfo, mongoDBUserId } = this.props;
		if (nextMatches.length > 0) {
			this.props.onNextMatch(basicMatchInfo[1], mongoDBUserId);
		} else {
			this.props.onNextMatch(null, null);
		}
	}

	renderMatchAge(matchAge, colorThemeText6Color) {
		if (matchAge !== undefined && matchAge !== null) {
			return (
				<Col>
					<h2
						style={{
							color: colorThemeText6Color
						}}
					>
						{", "}
						{matchAge}
					</h2>
				</Col>
			);
		}
	}

	displayNeedToGetMoreNeurons = () => {
		message.config({
			top: 90
		});
		message.warn(
			"You need " +
				NUMBER_NEURONS_TO_SAY_HI +
				" neurons to 'Say Hi'. Get neurons by voting or asking questions in Sorting Hat.",
			5
		);
	};

	onStartConversation(history, matchName, matchId) {
		const { neuronsInBillions, mongoDBUserId } = this.props;
		if (neuronsInBillions >= NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS) {
			this.props.decrementNeurons(
				NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS,
				mongoDBUserId
			);
			this.props.onStartConversation(history, matchName, matchId);
		} else {
			this.displayNeedToGetMoreNeurons();
		}
	}

	renderMatchTotalVotes(totalUserVotes) {
		const { colorTheme } = this.props;

		let voteDescription;
		if (totalUserVotes <= 1) {
			voteDescription = "total vote";
		} else {
			voteDescription = "total votes";
		}
		return (
			<Row type="flex" justify="start" align="middle">
				<Col>
					<h3
						style={{
							color: colorTheme.text3Color
						}}
					>
						{totalUserVotes} {voteDescription}
					</h3>
				</Col>
			</Row>
		);
	}

	renderMatchPicture(imageUrl) {
		if (imageUrl !== undefined && imageUrl !== null) {
			return (
				<Row
					style={{ padding: "5px 0px 0px 0px" }}
					type="flex"
					justify="start"
					align="middle"
				>
					<Col>
						<Avatar
							style={{
								width: 75,
								height: 75
							}}
							shape="circle"
							src={imageUrl}
						/>
					</Col>
				</Row>
			);
		} else {
			return <div />;
		}
	}

	renderMatchButtons() {
		const { activeSection, colorTheme, match, history } = this.props;
		// conversations also uses this to show selected contact info
		if (activeSection === "matches") {
			return (
				<Row
					style={{ padding: "8px 0px 0px 0px" }}
					type="flex"
					justify="space-between"
					align="top"
				>
					<Col span={11}>
						<Button
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
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
								borderColor: colorTheme.keyText7Color,
								background: colorTheme.keyText7Color,
								color: colorTheme.text1Color
							}}
							onClick={e =>
								this.onStartConversation(history, match.name, match.id)
							}
						>
							Say Hi
						</Button>
					</Col>
				</Row>
			);
		}
	}

	render() {
		const { match, colorTheme } = this.props;
		return (
			<Row type="flex" justify="center" align="top">
				<Col>
					<Card
						hoverable={true}
						borderded="false"
						loading={false}
						style={{
							color: colorTheme.text1Color,
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color
						}}
					>
						<Row type="flex" justify="center" align="middle">
							<Col>
								<h2
									style={{
										color: colorTheme.keyText6Color
									}}
								>
									{match.name}
								</h2>
							</Col>
							{this.renderMatchAge(match.age, colorTheme.text6Color)}
							<Col style={{ padding: "0px 0px 10px 10px" }}>
								<LinkedIn value={match.linkedInPublicProfileUrl} />
							</Col>
							<Col style={{ padding: "0px 0px 10px 10px" }}>
								<Github value={match.githubPublicProfileUrl} />
							</Col>
						</Row>
						<Row type="flex" justify="center" align="middle">
							<Col>{this.renderMatchTotalVotes(match.totalUserVotes)}</Col>
						</Row>
						<Row type="flex" justify="center" align="middle">
							<Col>
								<Interests interests={match.interests} />
							</Col>
						</Row>
						<Row type="flex" justify="center" align="middle">
							<Col>
								<TimeZone value={match.timeZone} />
							</Col>
						</Row>
						<Row type="flex" justify="center" align="middle">
							<Col>{this.renderMatchPicture(match.imageUrl)}</Col>
						</Row>
						{this.renderMatchButtons()}
					</Card>
				</Col>
			</Row>
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
		activeSection: state.colorTheme.activeSection,
		neuronsInBillions: state.profile.payment.neuronsInBillions,
		mongoDBUserId: state.auth.mongoDBUserId,
		nextMatches: state.matches.nextMatches,
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

	const profileDispatchers = bindActionCreators(
		profileActionCreators,
		dispatch
	);

	return {
		onStartConversation: (history, matchName, matchId) => {
			matchesDispatchers.onStartConversation(history, matchName, matchId);
		},
		onNextMatch: (matchNeededToBeChecked, mongoDBUserId) => {
			matchesDispatchers.onNextMatch(matchNeededToBeChecked, mongoDBUserId);
		},
		decrementNeurons: (neuronsInBillions, mongoDBUserId) => {
			profileDispatchers.decrementNeurons(neuronsInBillions, mongoDBUserId);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchCards);
