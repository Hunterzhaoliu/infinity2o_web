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
					<Col
						style={{
							padding: "3px 0px 0px"
						}}
						key="0"
					>
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
		}
		switch (loggedInState) {
			case "not_logged_in":
				return (
					<Row type="flex" justify="space-between">
						<Col>
							<Row type="flex" justify="start">
								<Col>
									<img
										alt=""
										style={{ width: "30px" }}
										src="https://user-images.githubusercontent.com/2585159/40581477-fe1ecac2-611e-11e8-9c30-ab8a66644425.png"
									/>
								</Col>
								<Col>
									{" "}
									<h2
										style={{
											padding: "0px 8px 0px",
											color: GREY_1,
											fontFamily: "Lucida Grande"
										}}
									>
										infinity2o
									</h2>
								</Col>
							</Row>
						</Col>
						<Col>
							<Row type="flex" justify="end">
								<Col xs={{ span: 12 }}>
									<Button
										style={{
											borderColor: RED_ORANGE_7,
											background: RED_ORANGE_7,
											color: GREY_1,
											fontFamily: "Lucida Grande"
										}}
									>
										<a href="/auth/google">
											Gmail Login{" "}
											<Icon
												style={{ fontSize: 15 }}
												type="google"
											/>
										</a>
									</Button>
								</Col>
								<Col
									xs={{ span: 12 }}
									style={{
										padding: "0px 16px 0px"
									}}
								>
									<Button
										style={{
											borderColor: BLUE_7,
											background: BLUE_7,
											color: GREY_1,
											fontFamily: "Lucida Grande"
										}}
									>
										<a href="/auth/linkedIn">
											LinkedIn Login{" "}
											<Icon
												style={{ fontSize: 15 }}
												type="linkedin"
											/>
										</a>
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				);
			case "logged_in":
				return (
					<div>
						<Row type="flex" justify="space-between">
							<Col
								md={{ span: 22, offset: 0 }}
								lg={{ span: 22, offset: 0 }}
								xl={{ span: 22, offset: 0 }}
								key="0"
							>
								<Row type="flex">
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
					</div>
				);
			default:
				console.log("ERROR: site in invalid state = ", loggedInState);
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
					width: "100%"
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
