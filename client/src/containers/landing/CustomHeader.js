import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as customHeaderActionCreators from "../../actions/customHeader";
import ChangeThemeButton from "../navigationButtons/ChangeThemeButton";
import TourButton from "../navigationButtons/TourButton";
import ProfileButton from "../navigationButtons/ProfileButton";
import SortingHatButton from "../navigationButtons/SortingHatButton";
import MatchesButton from "../navigationButtons/MatchesButton";
import ConversationButton from "../navigationButtons/ConversationButton";
import LogoutButton from "../navigationButtons/LogoutButton";
import { GREY_9, GREY_1, RED_ORANGE_7, BLUE_7 } from "../styles/ColorConstants";
import { Layout, Row, Col, Button, Icon } from "antd";
const { Header } = Layout;

class CustomHeader extends Component {
	constructor(props) {
		super(props);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.props.updateWindowDimensions(
			window.innerWidth,
			window.innerHeight
		);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	renderNotLoggedInHeaderButtons(windowWidth) {
		let largeGmailLoginText = "Gmail Login ";
		let largeLinkedInLoginText = "LinkedIn Login ";
		let smallLoginText = "";
		let paddingBetweenLoginButtons = "0px 0px 0px 30px";

		if (windowWidth < 768) {
			// less than medium screen, need to change where the infinity2o logo
			// is and adjust text size
			largeGmailLoginText = "";
			largeLinkedInLoginText = "";
			smallLoginText = " Login";
			paddingBetweenLoginButtons = "0px 0px 0px 10px";
		}
		return (
			<Row type="flex" justify="center" align="middle">
				<Col
					xs={{ span: 10 }}
					sm={{ span: 15 }}
					md={{ span: 14 }}
					lg={{ span: 15 }}
					xl={{ span: 17 }}
				>
					<Row type="flex" justify="start" align="middle">
						<Col>
							<img
								alt=""
								style={{ width: "32px" }}
								src="https://user-images.githubusercontent.com/2585159/40581477-fe1ecac2-611e-11e8-9c30-ab8a66644425.png"
							/>
						</Col>
						<Col>
							{" "}
							<h2
								style={{
									padding: "0px 0px 0px 10px",
									color: GREY_1,
									fontFamily: "Lucida Grande",
									marginBottom: 0,
									lineHeight: 1,
									fontSize: 20
								}}
							>
								infinity2o
							</h2>
						</Col>
					</Row>
				</Col>
				<Col>
					<Button
						style={{
							borderColor: RED_ORANGE_7,
							background: RED_ORANGE_7,
							color: GREY_1,
							fontFamily: "Lucida Grande",
							height: 32
						}}
					>
						<a href="/auth/google">
							{largeGmailLoginText}
							<Icon style={{ fontSize: 15 }} type="google" />
							{smallLoginText}
						</a>
					</Button>
				</Col>
				<Col
					style={{
						padding: paddingBetweenLoginButtons
					}}
				>
					<Button
						style={{
							borderColor: BLUE_7,
							background: BLUE_7,
							color: GREY_1,
							fontFamily: "Lucida Grande",
							height: 32
						}}
					>
						<a href="/auth/linkedIn">
							{largeLinkedInLoginText}
							<Icon style={{ fontSize: 15 }} type="linkedin" />
							{smallLoginText}
						</a>
					</Button>
				</Col>
			</Row>
		);
	}

	renderHeaderButtons() {
		const {
			colorTheme,
			loggedInState,
			windowWidth,
			siderDisplay,
			toggleSider
		} = this.props;

		if (windowWidth < 768 && loggedInState === "logged_in") {
			// show a menu with buttons instead of nav bar
			let siderIcon;
			if (siderDisplay === false) {
				siderIcon = "menu-unfold";
			} else {
				siderIcon = "menu-fold";
			}

			return (
				<Row type="flex" justify="start">
					<Col key="0">
						<Button
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text2Color
							}}
							onClick={toggleSider}
						>
							<Icon type={siderIcon} />
						</Button>
					</Col>
				</Row>
			);
		} else if (loggedInState === "not_logged_in") {
			return this.renderNotLoggedInHeaderButtons(windowWidth);
		} else if (loggedInState === "logged_in") {
			return (
				<Row type="flex" justify="center" align="middle">
					<Col md={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 20 }}>
						<Row type="flex" align="middle">
							<ChangeThemeButton />
							<TourButton />
							<ProfileButton />
							<SortingHatButton />
							<MatchesButton />
							<ConversationButton />
						</Row>
					</Col>
					<LogoutButton />
				</Row>
			);
		}
	}

	render() {
		const { colorTheme, loggedInState } = this.props;
		let headerBackground;
		switch (loggedInState) {
			case "not_logged_in":
				headerBackground = GREY_9;
				break;
			case "logged_in":
				headerBackground = colorTheme.text8Color;
				break;
			default:
		}
		return (
			<Header
				style={{
					background: headerBackground,
					position: "fixed",
					zIndex: 1, // make every component display under the header
					width: "100%",
					height: "60px",
					lineHeight: "60px",
					padding: "0px 0px 0px 0px"
				}}
			>
				{this.renderHeaderButtons()}
			</Header>
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
		windowWidth: state.customHeader.windowWidth,
		siderDisplay: state.customHeader.siderDisplay,
		loggedInState: state.auth.loggedInState
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const customHeaderDispatchers = bindActionCreators(
		customHeaderActionCreators,
		dispatch
	);
	return {
		updateWindowDimensions: (newWindowWidth, newWindowHeight) => {
			customHeaderDispatchers.updateWindowDimensions(
				newWindowWidth,
				newWindowHeight
			);
		},
		toggleSider: () => {
			customHeaderDispatchers.toggleSider();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomHeader);
