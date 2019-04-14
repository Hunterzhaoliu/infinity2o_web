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
import LoginButtons from "./LoginButtons";
import { GREY_9, GREY_1 } from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
import "./custom-header.css";

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
		return (
			<Row
				style={{ height: "60px" }}
				type="flex"
				justify="center"
				align="middle"
			>
				<Col
					xs={{ span: 11 }}
					sm={{ span: 14 }}
					md={{ span: 13 }}
					lg={{ span: 15 }}
					xl={{ span: 16 }}
				>
					<Row type="flex" justify="start" align="middle">
						<Col>
							<a href="/">
								<img
									alt=""
									style={{ width: "32px" }}
									src="https://user-images.githubusercontent.com/2585159/40581477-fe1ecac2-611e-11e8-9c30-ab8a66644425.png"
								/>
							</a>
						</Col>
						<Col>
							<a className="custom-header-anchor" href="/">
								<h2
									style={{
										padding: "0px 0px 0px 10px",
										color: GREY_1,
										fontFamily: "Overpass",
										marginBottom: 0,
										lineHeight: 1,
										fontSize: 20
									}}
								>
									infinity2o
								</h2>
							</a>
						</Col>
					</Row>
				</Col>
				<LoginButtons />
			</Row>
		);
	}

	renderHeaderButtons() {
		const { loggedInState, windowWidth, toggleMenu } = this.props;

		if (windowWidth < 768 && loggedInState === "logged_in") {
			return (
				<Row type="flex" justify="start">
					<Col>
						<button
							style={{
								backgroundColor: "transparent",
								border: "none",
								padding: "0px"
							}}
							onClick={toggleMenu}
						>
							<ChangeThemeButton />
						</button>
					</Col>
				</Row>
			);
		} else if (loggedInState === "not_logged_in") {
			return this.renderNotLoggedInHeaderButtons(windowWidth);
		} else if (loggedInState === "logged_in") {
			return (
				<Row type="flex" justify="center" align="top">
					<Col md={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 20 }}>
						<Row type="flex" align="top">
							<Col>
								<ChangeThemeButton />
							</Col>
							<Col xl={{ offset: 2 }} />
							<Col style={{ padding: "0px 0px 0px 10px" }}>
								<TourButton />
							</Col>
							<Col style={{ padding: "0px 0px 0px 10px" }}>
								<ProfileButton />
							</Col>
							<Col style={{ padding: "0px 0px 0px 10px" }}>
								<SortingHatButton />
							</Col>
							<Col style={{ padding: "0px 0px 0px 10px" }}>
								<MatchesButton />
							</Col>
							<Col style={{ padding: "0px 0px 0px 10px" }}>
								<ConversationButton />
							</Col>
						</Row>
					</Col>
					<Col>
						<LogoutButton />
					</Col>
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
					zIndex: 2, // make every component display under the header
					width: "100%",
					height: "60px",
					lineHeight: "60px",
					padding: "0px 20px"
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
		menuIsDisplayed: state.customHeader.menuIsDisplayed,
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
		toggleMenu: () => {
			customHeaderDispatchers.toggleMenu();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomHeader);
