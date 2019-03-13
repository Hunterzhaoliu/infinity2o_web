import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import VoteEdit from "./VoteEdit";
import { Layout, Row, Col, Avatar, Card } from "antd";
import LinkedIn from "../profileInformation/LinkedIn";
import Github from "../profileInformation/Github";
import Neurons from "../profileInformation/Neurons";
import Interests from "../profileInformation/Interests";
import Email from "../profileInformation/Email";
import TimeZone from "../profileInformation/TimeZone";

import "./Profile.css";
const { Content } = Layout;

class Profile extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onProfile();
	}

	renderNameAndAge() {
		const { profile } = this.props;
		if (profile.age !== undefined) {
			return profile.name + ", " + profile.age;
		} else {
			return profile.name;
		}
	}

	renderProfile() {
		const { colorTheme, profile } = this.props;
		return (
			<Card
				bordered="false"
				loading={false}
				style={{
					color: colorTheme.text1Color,
					borderColor: colorTheme.text05Color,
					background: colorTheme.text05Color
				}}
				bodyStyle={{ padding: "0px" }} // padding around inside border of card
			>
				<Row type="flex" justify="center">
					<div
						style={{
							width: "100%",
							height: "130px",
							backgroundColor: colorTheme.key
						}}
					/>
					<Avatar
						style={{ position: "absolute", top: "50px" }}
						shape="circle"
						src={profile.imageUrl}
					/>
				</Row>
				<Row
					style={{ padding: "90px 0px 20px 0px" }}
					type="flex"
					justify="center"
					align="middle"
				>
					<Col>
						<p
							style={{
								color: colorTheme.keyText6Color,
								fontFamily: "Overpass",
								lineHeight: 1,
								marginBottom: 0,
								fontSize: 26
							}}
						>
							{this.renderNameAndAge()}
						</p>
					</Col>
					<LinkedIn value={profile.linkedInPublicProfileUrl} />
					<Github value={profile.githubPublicProfileUrl} />
				</Row>
				<Neurons payment={profile.payment} />
				<Row>
					<Interests interests={profile.interests} />
				</Row>
				<Row>
					<Email email={profile.email} />
				</Row>
				<Row>
					<TimeZone timeZone={profile.timeZone} />
				</Row>
				<Row type="flex" justify="center">
					<Col style={{ padding: "20px 0px 60px 0px" }}>
						<a
							className="profile-edit-anchor"
							style={{
								borderColor: colorTheme.backgroundColor,
								background: colorTheme.backgroundColor,
								color: colorTheme.text3Color
							}}
							href="/profile/edit"
						>
							Edit Info
						</a>
					</Col>
				</Row>
			</Card>
		);
	}

	renderQuestions() {
		const { colorTheme, profile } = this.props;
		if (profile.asks != null) {
			// user has asked a question in sorting hat
			const newest8Questions = profile.asks.questions.slice(-8).reverse();
			return _.map(newest8Questions, (question, key) => {
				return (
					<Row key={key}>
						<Col>
							<p
								style={{
									color: colorTheme.text3Color,
									fontFamily: "Overpass",
									lineHeight: 2.29, // height of vote button/font size: 32/14
									marginBottom: 0,
									fontSize: 16,
									padding: "0px 0px 10px 0px"
								}}
							>
								{question.question}
							</p>
						</Col>
					</Row>
				);
			});
		}
	}

	render() {
		const { colorTheme, profile } = this.props;
		return (
			<Content
				style={{
					padding: "120px 0px 0px", // top right bottom left
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="center" align="middle">
					<Col
						sm={{ span: 21 }}
						md={{ span: 21 }}
						lg={{ span: 20 }}
						xl={{ span: 20 }}
					>
						<Row type="flex" justify="center">
							<Col
								sm={{ span: 21 }}
								md={{ span: 21 }}
								lg={{ span: 20 }}
								xl={{ span: 8 }}
							>
								{this.renderProfile()}
							</Col>
						</Row>
						<Row style={{ padding: "60px 0px 0px 0px" }}>
							<Col span={12}>
								<Row
									style={{ padding: "0px 0px 5px 0px" }}
									type="flex"
									justify="left"
									align="bottom"
								>
									<h2
										style={{
											color: colorTheme.keyText6Color,
											fontFamily: "Overpass",
											lineHeight: 1,
											marginBottom: 0,
											fontSize: 32
										}}
									>
										Votes
									</h2>
									<p
										style={{
											padding: "0px 0px 0px 10px",
											color: colorTheme.text6Color,
											fontFamily: "Overpass",
											lineHeight: 1,
											marginBottom: 0,
											fontSize: 18
										}}
									>
										{"(" +
											String(
												profile.asks.totalUserVotes
											) +
											")"}
									</p>
								</Row>
								<hr
									style={{
										backgroundColor:
											colorTheme.keyText7Color,
										width: "90%",
										height: 2,
										border: 0,
										margin: "0px 0px 30px 0px"
									}}
								/>
								<Row type="flex" justify="start">
									<Col>
										<VoteEdit />
									</Col>
								</Row>
							</Col>
							<Col span={12}>
								<Row
									style={{ padding: "0px 0px 5px 0px" }}
									type="flex"
									justify="left"
									align="bottom"
								>
									<h2
										style={{
											color: colorTheme.keyText6Color,
											fontFamily: "Overpass",
											lineHeight: 1,
											marginBottom: 0,
											fontSize: 32
										}}
									>
										Questions
									</h2>
									<p
										style={{
											padding: "0px 0px 0px 10px",
											color: colorTheme.text6Color,
											fontFamily: "Overpass",
											lineHeight: 1,
											marginBottom: 0,
											fontSize: 18
										}}
									>
										{"(" +
											String(
												profile.asks.questions.length
											) +
											")"}
									</p>
								</Row>
								<hr
									style={{
										backgroundColor:
											colorTheme.keyText7Color,
										width: "90%",
										height: 2,
										border: 0,
										margin: "0px 0px 30px 0px"
									}}
								/>
								{this.renderQuestions()}
							</Col>
						</Row>
					</Col>
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
		profile: state.profile
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
	return {
		onProfile: () => {
			colorThemeDispatchers.onProfile();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);
