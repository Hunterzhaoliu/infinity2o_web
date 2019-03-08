import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { connect } from "react-redux";
import { Icon } from "antd";
import "./change-theme-button.css";

class ChangeThemeButton extends Component {
	renderSaveIcon(saveState) {
		if (saveState === "save_start") {
			return (
				<Icon
					style={{ width: "32px", padding: "0px 16px 0px" }}
					type="loading"
				/>
			);
		} else if (saveState === "save_done") {
			return;
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
		const { colorTheme, onRandomColorTheme, colorThemeSave } = this.props;

		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);
		document.documentElement.style.setProperty(
			`--keyText5Color`,
			colorTheme.keyText5Color
		);

		if (colorThemeSave === "save_done" || colorThemeSave === null) {
			return (
				<button onClick={onRandomColorTheme}>
					<img
						alt=""
						style={{ width: "32px" }}
						src="https://user-images.githubusercontent.com/2585159/40581477-fe1ecac2-611e-11e8-9c30-ab8a66644425.png"
					/>
				</button>
			);
		} else {
			return (
				<button onClick={onRandomColorTheme}>
					{this.renderSaveIcon(colorThemeSave)}
				</button>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		colorThemeSave: state.profile.colorThemeSave
	};
}

function mapDispatchToProps(dispatch) {
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);
	return {
		onRandomColorTheme: () => {
			colorThemeDispatchers.generateRandomColorTheme();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangeThemeButton);
