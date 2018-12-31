import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActions from "../../actions/colorTheme";
import * as landingActions from "../../actions/landing";
import { bindActionCreators } from "redux";
import Testimonials from "./Testimonials";
import { GREY_9, GREY_7, GREY_2, GREY_1 } from "../styles/ColorConstants";
import LoginButtons from "./LoginButtons";
import InputVote from "../sorting_hat/InputVote";
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

	renderCartoons() {
		return (
			<div>
				<Row
					style={{
						padding: "65px 0px 0px 0px" // top left&right bottom
					}}
					type="flex"
					justify="center"
					align="top"
				>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 12 }}
						xl={{ span: 12 }}
					>
						<Row type="flex" justify="center" align="middle">
							<Col>
								<h2
									style={{
										textAlign: "center",
										color: GREY_2,
										fontFamily: "Lucida Grande",
										fontWeight: "bold",
										fontSize: 22,
										padding: "0px 0px 0px 0px"
									}}
								>
									Online class alone
								</h2>
							</Col>
						</Row>
						<Row type="flex" justify="center" align="middle">
							<Col>
								<div style={{ height: "30px" }} />
							</Col>
						</Row>
						<Row type="flex" justify="center">
							<Col>
								<img
									alt=""
									style={{
										height: "290px",
										padding: "0px 0px 0px 15px"
									}}
									src="https://user-images.githubusercontent.com/2585159/40999312-1c66c9ea-68d0-11e8-9528-4fe4123070d3.png"
								/>
							</Col>
						</Row>
					</Col>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 14 }}
						md={{ span: 16 }}
						lg={{ span: 11 }}
						xl={{ span: 12 }}
					>
						<Row type="flex" justify="center">
							<Col>
								<h2
									style={{
										textAlign: "center",
										color: GREY_2,
										fontFamily: "Lucida Grande",
										fontWeight: "bold",
										fontSize: 22,
										padding: "0px 220px 0px 0px"
									}}
								>
									Online class through infinity2o
								</h2>
							</Col>
						</Row>
						<Row type="flex" justify="center" align="middle">
							<div style={{ height: "35px" }} />
						</Row>
						<Row type="flex" justify="center">
							<Col>
								<img
									alt=""
									style={{
										height: "300px",
										padding: "0px 250px 0px 0px"
									}}
									src="https://user-images.githubusercontent.com/2585159/40999319-20ee0d16-68d0-11e8-900a-0c239b422906.png"
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}

	renderMarketingInfo() {
		return (
			<div>
				<Row
					type="flex"
					justify="center"
					style={{ padding: "135px 0px 0px 0px" }}
				>
					<Col>
						<h1
							key="0"
							style={{
								textAlign: "center",
								color: GREY_1,
								fontSize: 32,
								fontFamily: "Lucida Grande",
								fontWeight: "bold"
							}}
						>
							Meet people with similar beliefs to take online
							courses with.
						</h1>
					</Col>
				</Row>
				{this.renderCartoons()}
			</div>
		);
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
					style={{ padding: "100px 0px 0px" }}
				>
					<Col>
						<h1
							style={{
								textAlign: "center",
								color: GREY_9,
								fontSize: 30,
								fontFamily: "Lucida Grande",
								fontWeight: "bold"
							}}
						>
							{how_part_0}{" "}
							<img
								alt=""
								style={{
									width: 50,
									padding: "0px 0px 5px 5px"
								}}
								src="https://user-images.githubusercontent.com/24757872/40881487-37bb7a50-668d-11e8-8d2e-d3be80bdef09.png"
							/>
						</h1>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<h1
							style={{
								textAlign: "center",
								color: GREY_7,
								fontSize: 25,
								fontFamily: "Lucida Grande"
							}}
						>
							{how_part_1}
						</h1>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="middle"
					style={{
						textAlign: "center",
						padding: "75px 0px 0px 0px"
					}}
				>
					<Col>
						<InputVote />
					</Col>
				</Row>
			</div>
		);
	}

	renderMatch() {
		const how_part_2 = "Chat with the matches you want to learn with";

		return (
			<div>
				<Row type="flex" justify="center">
					<Col>
						<h1
							style={{
								textAlign: "center",
								color: GREY_1,
								fontSize: 30,
								fontFamily: "Lucida Grande",
								fontWeight: "bold",
								padding: "100px 0px 0px 0px"
							}}
						>
							{how_part_2}
						</h1>
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
					<Col>
						<img
							alt="Match Example"
							style={{
								height: "350px"
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
							padding: "100px 0px 0px" // top left&right bottom
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
									fontSize: "30px",
									fontWeight: "bold"
								}}
							>
								Come join Earth's largest community of online
								learners.
							</h2>
						</Col>
					</Row>
					<Row
						style={{
							padding: "50px 0px 0px" // top left&right bottom
						}}
						type="flex"
						justify="center"
					>
						<Col>
							<LoginButtons />
						</Col>
					</Row>
				</div>
			);
		}
	}

	renderTestimonials() {
		return (
			<Row
				style={{
					padding: "40px 0px 0px" // top left&right bottom
				}}
				type="flex"
				justify="center"
				align="top"
			>
				<Col
					xs={{ span: 24 }}
					sm={{ span: 14 }}
					md={{ span: 10 }}
					lg={{ span: 8 }}
					xl={{ span: 6 }}
				>
					<Testimonials />
				</Col>
			</Row>
		);
	}

	render() {
		return (
			<div>
				<Content
					style={{
						height: "96vh",
						background: GREY_9
					}}
				>
					{this.renderMarketingInfo()}
				</Content>
				<Content
					style={{
						padding: "0px 255px 100px", // top left&right bottom
						background: GREY_1
					}}
				>
					{this.renderLandingAsks()}
				</Content>
				<Content
					style={{
						padding: "0px 50px 100px", // top left&right bottom
						background: GREY_9
					}}
				>
					{this.renderMatch()}
				</Content>
				<Content
					style={{
						padding: "0px 50px 100px", // top left&right bottom
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
