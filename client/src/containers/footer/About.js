import React, { Component } from "react";
import { connect } from "react-redux";
import * as matchesActionCreators from "../../actions/matches/matches";
import { bindActionCreators } from "redux";
import { GREY_1, GREY_9 } from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;

class About extends Component {
	componentWillMount() {
		// run once before first render()
		const qLiuMongoDBUserId = "5ae6725046dc7c001428ab7b";
		const hunterLiuMongoDBUserId = "5b25a085bf0a8f0014da8d9a";
		this.props.fetchListOfUsers([
			qLiuMongoDBUserId,
			hunterLiuMongoDBUserId
		]);
	}

	render() {
		const { colorTheme, loggedInState } = this.props;

		let background = colorTheme.backgroundColor;
		let textColor = colorTheme.text1Color;
		if (loggedInState === "not_logged_in") {
			background = GREY_1;
			textColor = GREY_9;
		}

		return (
			<Content
				style={{
					textAlign: "center",
					padding: "75px 50px 0px", // top right bottom left
					background: background
				}}
			>
				<Row type="flex" justify="center">
					<Col>
						<h1 style={{ color: textColor }}>Why</h1>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<h2
							key="0"
							style={{
								padding: "20px 0px 0px",
								color: colorTheme.text2Color
							}}
						>
							We believe the future of education can become better
							by following these principles:
						</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							1) People have different interests at different
							times so we should cater the education to each
							person's interests and ability.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							2) Teach to the problem instead of the tools. This
							way the relevance of the tools become obvious.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							3) People enjoy learning with others that believe in
							the same core beliefs.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							4) Learn how to create your own job instead of
							taking tests to get into a college (AKA nightclub &
							job insurance).
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<h1 style={{ color: textColor }}>
							How: Master Plan version 1
						</h1>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							1) Get 100 users that love us. A user that loves us
							will have their profile filled out and telling their
							friends about us!
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							2) Recommend online courses (that teach to a
							problem) for our students to take together to
							generate affiliate marketing revenue.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							3) Open our first Infinity2o center in Philadelphia,
							PA where any Infinity2o students can come to work on
							their online course with their partner for $X/month.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							4) Our Infinity2o centers will have paid teaching
							assistants for the difficult online courses.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							5) If the Philadelphia location is profitable we
							will continue to open Infinity2o centers in our
							communities most popular cities.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<h1 style={{ color: textColor }}>Team</h1>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col />
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
		loggedInState: state.auth.loggedInState
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

	return {
		fetchListOfUsers: listOfUserMongoDBUserId => {
			matchesDispatchers.fetchListOfUsers(listOfUserMongoDBUserId);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(About);
