import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { connect } from "react-redux";
import { GREY_1, GREY_2, GREY_3, GREY_4 } from "../styles/ColorConstants";
import { Layout, Row, Col, Button } from "antd";
const { Footer } = Layout;

class CustomFooter extends Component {
	render() {
		const { colorTheme, loggedInState, onFooter } = this.props;
		let backgroundColor = this.props.colorTheme.backgroundColor;
		let textColor = this.props.colorTheme.text7Color;
		let buttonColor = this.props.colorTheme.text8Color;
		let textColor2 = this.props.colorTheme.text6Color;
		if (loggedInState === "not_logged_in") {
			backgroundColor = GREY_1;
			textColor = GREY_3;
			buttonColor = GREY_2;
			textColor2 = GREY_4;
		}

		if (colorTheme.activeSection === "conversations") {
			return <div />;
		} else {
			return (
				<Footer
					style={{
						textAlign: "center",
						background: backgroundColor
					}}
				>
					<Row type="flex" justify="center">
						<Col>
							<Button
								style={{
									borderColor: buttonColor,
									background: buttonColor,
									fontFamily: "Lucida Grande"
								}}
								size={"small"}
								onClick={onFooter}
							>
								<a
									style={{
										color: textColor2
									}}
									href="/terms"
								>
									Terms
								</a>
							</Button>
						</Col>
						<Col
							style={{
								padding: "0px 0px 0px 20px"
							}}
						>
							<Button
								style={{
									borderColor: buttonColor,
									background: buttonColor,
									fontFamily: "Lucida Grande"
								}}
								size={"small"}
								onClick={onFooter}
							>
								<a
									style={{
										color: textColor2
									}}
									href="/privacy"
								>
									Privacy
								</a>
							</Button>
						</Col>
						<Col
							style={{
								padding: "0px 0px 0px 20px"
							}}
						>
							<Button
								style={{
									borderColor: buttonColor,
									background: buttonColor,
									fontFamily: "Lucida Grande"
								}}
								size={"small"}
								onClick={onFooter}
							>
								<a
									style={{
										color: textColor2
									}}
									href="/about"
								>
									About
								</a>
							</Button>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col span={24}>
							<p
								style={{
									color: textColor,
									padding: "20px 0px 0px 0px",
									fontFamily: "Lucida Grande",
									marginBottom: 0
								}}
							>
								infinity2o © 2018
							</p>
						</Col>
					</Row>
				</Footer>
			);
		}
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
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);
	return {
		onFooter: () => {
			colorThemeDispatchers.onFooter();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomFooter);
