import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as customHeaderActionCreators from "../../actions/customHeader";
import { connect } from "react-redux";
import { Icon } from "antd";
import "./change-theme-button.css";
import logo from "../images/logo.png";

class ChangeThemeButton extends Component {
	renderButtonDisplay(saveState) {
		if (saveState === "save_done" || saveState === null) {
			return <img alt="" style={{ width: "32px" }} src={logo} />;
		} else if (saveState === "save_start") {
			return (
				<Icon
					style={{ width: "32px", padding: "0px 16px 0px" }}
					type="loading"
				/>
			);
		} else if (saveState === "save_error") {
			return (
				<Icon
					style={{ width: "32px", padding: "0px 16px 0px" }}
					type="warning"
				/>
			);
		}
	}

	render() {
		const {
			windowWidth,
			loggedInState,
			colorTheme,
			colorThemeSave,
			onRandomColorTheme,
			toggleMenu
		} = this.props;

		document.documentElement.style.setProperty(
			`--keyText4Color`,
			colorTheme.keyText4Color
		);

		if (windowWidth < 768 && loggedInState === "logged_in") {
			// need to have change theme button toggle the menu instead of changing theme
			return (
				<button className="change-theme-button" onClick={toggleMenu}>
					{this.renderButtonDisplay(colorThemeSave)}
				</button>
			);
		} else {
			return (
				<button
					className="change-theme-button"
					onClick={onRandomColorTheme}
				>
					{this.renderButtonDisplay(colorThemeSave)}
				</button>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		colorThemeSave: state.profile.colorThemeSave,
		windowWidth: state.customHeader.windowWidth,
		loggedInState: state.auth.loggedInState
	};
}

function mapDispatchToProps(dispatch) {
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	const customHeaderDispatchers = bindActionCreators(
		customHeaderActionCreators,
		dispatch
	);

	return {
		onRandomColorTheme: () => {
			colorThemeDispatchers.generateRandomColorTheme();
		},
		toggleMenu: () => {
			customHeaderDispatchers.toggleMenu();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangeThemeButton);
