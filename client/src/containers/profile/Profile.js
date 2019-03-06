import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import VoteEdit from "./VoteEdit";
import { Layout, Row, Col, Button, Avatar, Card } from "antd";
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
				hoverable={true}
				bordered="false"
				loading={false}
				style={{
					color: colorTheme.text1Color,
					borderColor: "rgb(245, 245, 245)",
					background: "rgb(245, 245, 245)"
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
								fontFamily: "Lucida Grande",
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
				<Row style={{ padding: "20px 0px 20px 20px" }}>
					<Interests interests={profile.interests} />
				</Row>
				<Row style={{ padding: "0px 0px 0px 20px" }}>
					<Email email={profile.email} />
				</Row>
				<Row style={{ padding: "20px 0px 0px 20px" }}>
					<TimeZone timeZone={profile.timeZone} />
				</Row>
				<Row type="flex" justify="center">
					<Col style={{ padding: "20px 0px 60px 0px" }}>
						<Button
							style={{
								borderColor: colorTheme.backgroundColor,
								background: colorTheme.backgroundColor,
								color: colorTheme.text3Color,
								fontFamily: "Lucida Grande",
								lineHeight: 1,
								marginBottom: 0,
								fontSize: 16
							}}
						>
							<a href="/profile/edit">Edit Info</a>
						</Button>
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
						<Col span={24}>
							<h3
								style={{
									color: colorTheme.text6Color
								}}
							>
								{question.question}
							</h3>
						</Col>
					</Row>
				);
			});
		}
	}

	render() {
		const { colorTheme } = this.props;
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
						<Row>
							<Col>
								<h2
									style={{
										padding: "60px 0px 5px 0px",
										color: colorTheme.keyText6Color,
										fontFamily: "Lucida Grande",
										lineHeight: 1,
										marginBottom: 0,
										fontSize: 32
									}}
								>
									Votes
								</h2>
								<hr
									style={{
										backgroundColor:
											colorTheme.keyText7Color,
										width: "100%",
										height: 4,
										border: 0,
										margin: "0px 0px 30px 0px"
									}}
								/>
							</Col>
						</Row>
						<Row type="flex" justify="start">
							<Col span={24}>
								<VoteEdit />
							</Col>
						</Row>
						<Row>
							<Col>
								<h2
									style={{
										padding: "25px 0px 0px", // top right bottom left
										color: colorTheme.keyText6Color
									}}
								>
									Questions
								</h2>
							</Col>
						</Row>
						{this.renderQuestions()}
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
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
