import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActions from "../../actions/colorTheme";
import * as landingActions from "../../actions/landing";
import { bindActionCreators } from "redux";
import { GREY_9, GREY_1 } from "../styles/ColorConstants";
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
		const { windowWidth } = this.props;
		const how_part_0 =
			"Find the best matches by expressing your beliefs to the Sorting Hat";

		let h2Padding = "120px 0px 0px";
		let imageHeight = 35;
		let h2FontSize = 26;
		let finalRowPadding = "60px 0px 90px 0px";

		if (windowWidth < 768) {
			h2Padding = "60px 0px 0px";
			imageHeight = 25;
			h2FontSize = 22;
			finalRowPadding = "30px 0px 30px 0px";
		}

		return (
			<div>
				<Row
					type="flex"
					justify="center"
					style={{ padding: h2Padding }}
				>
					<Col xs={{ span: 21 }} sm={{ span: 21 }} md={{ span: 22 }}>
						<h2
							style={{
								textAlign: "center",
								color: GREY_9,
								fontSize: h2FontSize,
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
									height: imageHeight
								}}
								src="https://user-images.githubusercontent.com/24757872/50742136-b9d11a00-11cc-11e9-960c-6d015d01d890.png"
							/>
						</h2>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					style={{
						padding: finalRowPadding
					}}
				>
					<Col
						xs={{ span: 19 }}
						sm={{ span: 16 }}
						md={{ span: 20 }}
						lg={{ span: 18 }}
						xl={{ span: 15 }}
					>
						<InputVote />
					</Col>
				</Row>
			</div>
		);
	}

	renderMatch() {
		const { windowWidth } = this.props;

		let h2Padding = "120px 0px 0px";
		let imageHeight = 400;
		let h2FontSize = 28;
		let pictureRowPadding = "60px 0px 120px";

		if (windowWidth < 768) {
			h2Padding = "60px 0px 0px";
			imageHeight = 250;
			h2FontSize = 22;
			pictureRowPadding = "30px 0px 60px";
		}

		return (
			<div>
				<Row type="flex" justify="center">
					<Col xs={{ span: 21 }} sm={{ span: 24 }}>
						<h2
							style={{
								textAlign: "center",
								color: GREY_1,
								fontSize: h2FontSize,
								fontFamily: "Lucida Grande",
								fontWeight: "bold",
								padding: h2Padding,
								marginBottom: 0,
								lineHeight: 1
							}}
						>
							Chat with the matches you want to learn with
						</h2>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					style={{
						padding: pictureRowPadding
					}}
				>
					<Col>
						<img
							alt="Match Example"
							style={{
								height: imageHeight
							}}
							src="https://user-images.githubusercontent.com/2585159/41510382-32448628-7229-11e8-8017-e87d7f761aea.png"
						/>
					</Col>
				</Row>
			</div>
		);
	}

	renderLogin() {
		const { loggedInState, windowWidth } = this.props;

		let callToActionPadding = "120px 0px 60px";
		let callToActionFontSize = 28;
		let loginPadding = "0px 0px 120px";

		if (windowWidth < 768) {
			callToActionPadding = "60px 0px 30px";
			callToActionFontSize = 22;
			loginPadding = "0px 0px 60px";
		}

		if (loggedInState === "not_logged_in") {
			return (
				<div>
					<Row
						style={{
							padding: callToActionPadding
						}}
						type="flex"
						justify="center"
					>
						<Col xs={{ span: 21 }} sm={{ span: 24 }}>
							<h2
								key="0"
								style={{
									textAlign: "center",
									color: GREY_9,
									fontFamily: "Lucida Grande",
									fontSize: callToActionFontSize,
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
						type="flex"
						justify="center"
						style={{ padding: loginPadding }}
					>
						<Col>
							<LoginButtons />
						</Col>
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
						background: GREY_1
					}}
				>
					{this.renderLandingAsks()}
				</Content>
				<Content
					style={{
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
		loggedInState: state.auth.loggedInState,
		windowWidth: state.customHeader.windowWidth
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
