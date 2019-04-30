import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import VoteEdit from "./VoteEdit";
import { Layout, Row, Col } from "antd";
import ProfileCard from "./ProfileCard";

const { Content } = Layout;

class Profile extends Component {
	componentWillMount() {
		const { loggedInState } = this.props;
		if (loggedInState === "not_logged_in") {
			// push user to landing page
			this.props.history.push("/");
		} else {
			this.props.onProfile();
		}
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
									lineHeight: "40px", // height of vote button/font size: 32/14
									marginBottom: 0,
									fontSize: "16px",
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
						<ProfileCard />
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
		loggedInState: state.auth.loggedInState,
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
