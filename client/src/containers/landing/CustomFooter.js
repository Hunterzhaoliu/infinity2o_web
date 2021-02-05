import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { connect } from "react-redux";
import { GREY_1, GREY_2, GREY_3, GREY_4, GREY_5 } from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
import { FONT } from "../styles/Font";
import "./custom-footer.css";

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
			textColor2 = GREY_5;
		}

		if (colorTheme.activeSection === "conversations") {
			return <div />;
		} else {
			return (
				<Footer
					style={{
						textAlign: "center",
						background: backgroundColor,
						padding: "30px 0px"
					}}
				>
					<Row type="flex" justify="center">
						<Col>
							<a
								className="custom-footer-anchor"
								style={{
									borderColor: buttonColor,
									background: buttonColor,
									color: textColor2,
									fontFamily: FONT
								}}
								size={"small"}
								onClick={onFooter}
								href="/terms"
							>
								team
							</a>
						</Col>
						<Col
							style={{
								padding: "0px 0px 0px 20px"
							}}
						>
							<a
								className="custom-footer-anchor"
								style={{
									borderColor: buttonColor,
									background: buttonColor,
									color: textColor2,
									fontFamily: FONT
								}}
								size={"small"}
								onClick={onFooter}
								href="/privacy"
							>
								sources
							</a>
						</Col>
						<Col
							style={{
								padding: "0px 0px 0px 20px"
							}}
						>
							<a
								className="custom-footer-anchor"
								style={{
									borderColor: buttonColor,
									background: buttonColor,
									color: textColor2,
									fontFamily: FONT
								}}
								size={"small"}
								onClick={onFooter}
								href="/privacy"
							>
								terms
							</a>
						</Col>
						<Col
							style={{
								padding: "0px 0px 0px 20px"
							}}
						>
							<a
								className="custom-footer-anchor"
								style={{
									borderColor: buttonColor,
									background: buttonColor,
									color: textColor2,
									fontFamily: FONT
								}}
								size={"small"}
								onClick={onFooter}
								href="/about"
							>
								privacy
							</a>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col span={24}>
							<p
								style={{
									color: textColor,
									padding: "20px 0px 0px 0px",
									fontFamily: FONT,
									marginBottom: 0
								}}
							>
								infinity2o Copyright © 2021 + ~13.899 * 10^13?
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
