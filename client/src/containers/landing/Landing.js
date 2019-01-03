import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActions from "../../actions/colorTheme";
import * as landingActions from "../../actions/landing";
import { bindActionCreators } from "redux";
import { GREY_9, GREY_7, GREY_1 } from "../styles/ColorConstants";
import LoginButtons from "./LoginButtons";
import InputVote from "../sorting_hat/InputVote";
import Marketing from "./Marketing";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;

class Landing extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchLandingPageSortingHatAsks();
	}

	componentDidMount() {
		// determines if logged_in_landing or logged_out_landing page
		// just to dispatch action saying which page user is on
		if (this.props.loggedInState === "logged_in") {
			this.props.onLoggedInLanding(true);
		} else {
			this.props.onLoggedInLanding(false);
		}
	}

	renderLandingAsks() {
		const how_part_0 =
			"Find the best matches by expressing your beliefs to the Sorting Hat";
		const how_part_1 = "by voting or asking questions";

		return (
			<div>
				<Row
					type="flex"
					justify="center"
					style={{ padding: "120px 0px 0px" }}
				>
					<Col style={{ height: "50px" }}>
						<p
							style={{
								textAlign: "center",
								color: GREY_9,
								fontSize: 26,
								fontFamily: "Lucida Grande",
								fontWeight: "bold",
								marginBottom: 0,
								lineHeight: 1
							}}
						>
							{how_part_0}{" "}
							<img
								alt=""
								style={{
									width: 50
								}}
								src="https://user-images.githubusercontent.com/24757872/40881487-37bb7a50-668d-11e8-8d2e-d3be80bdef09.png"
							/>
						</p>
					</Col>
				</Row>
				<Row>
					<Col style={{ height: "30px" }} />
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<p
							style={{
								textAlign: "center",
								color: GREY_7,
								fontSize: 23,
								fontFamily: "Lucida Grande",
								marginBottom: 0,
								lineHeight: 1
							}}
						>
							{how_part_1}
						</p>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="middle"
					style={{
						textAlign: "center",
						padding: "50px 0px 0px 0px"
					}}
				>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 12 }}
						xl={{ span: 16 }}
					>
						<InputVote />
					</Col>
				</Row>
			</div>
		);
	}

	renderMatch() {
		return (
			<div>
				<Row type="flex" justify="center">
					<Col>
						<h1
							style={{
								textAlign: "center",
								color: GREY_1,
								fontSize: 28,
								fontFamily: "Lucida Grande",
								fontWeight: "bold",
								padding: "120px 0px 0px 0px",
								marginBottom: 0,
								lineHeight: 1
							}}
						>
							Chat with the matches you want to learn with
						</h1>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					style={{
						textAlign: "center",
						padding: "60px 0px 0px 0px"
					}}
				>
					<Col>
						<img
							alt="Match Example"
							style={{
								height: "400px"
							}}
							src="https://user-images.githubusercontent.com/2585159/41510382-32448628-7229-11e8-8017-e87d7f761aea.png"
						/>
					</Col>
				</Row>
			</div>
		);
	}

	renderLogin() {
		const { loggedInState } = this.props;
		if (loggedInState === "not_logged_in") {
			return (
				<div>
					<Row
						style={{
							padding: "120px 0px 0px"
						}}
						type="flex"
						justify="center"
					>
						<Col>
							<h2
								key="0"
								style={{
									textAlign: "center",
									color: GREY_9,
									fontFamily: "Lucida Grande",
									fontSize: "28px",
									fontWeight: "bold",
									marginBottom: 0,
									lineHeight: 1
								}}
							>
								Join Earth's largest community of online
								learners.
							</h2>
						</Col>
					</Row>
					<Row
						style={{
							padding: "60px 0px 0px"
						}}
						type="flex"
						justify="center"
					>
						<Col>
							<LoginButtons />
						</Col>
					</Row>
					<Row>
						<Col style={{ height: "120px" }} />
					</Row>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<Content
					style={{
						background: GREY_9
					}}
				>
					<Marketing />
				</Content>
				<Content
					style={{
						padding: "0px 0px 120px",
						background: GREY_1
					}}
				>
					{this.renderLandingAsks()}
				</Content>
				<Content
					style={{
						padding: "0px 0px 120px",
						background: GREY_9
					}}
				>
					{this.renderMatch()}
				</Content>
				<Content
					style={{
						background: GREY_1
					}}
				>
					{this.renderLogin()}
				</Content>
			</div>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		loggedInState: state.auth.loggedInState
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const landingDispatchers = bindActionCreators(landingActions, dispatch);
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActions,
		dispatch
	);
	return {
		fetchLandingPageSortingHatAsks: () => {
			landingDispatchers.fetchLandingPageSortingHatAsks();
		},
		onLoggedInLanding: onLoggedInLanding => {
			colorThemeDispatchers.onLoggedInLanding(onLoggedInLanding);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Landing);
