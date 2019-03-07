import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { connect } from "react-redux";
import { Col, Icon } from "antd";
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

	renderChangeThemeButton() {
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
				<div className="button-div">
					<button onClick={onRandomColorTheme}>
						<img
							alt=""
							style={{ width: "32px" }}
							src="https://user-images.githubusercontent.com/2585159/40581477-fe1ecac2-611e-11e8-9c30-ab8a66644425.png"
						/>
					</button>
				</div>
			);
		} else {
			return (
				<button onClick={onRandomColorTheme}>
					{this.renderSaveIcon(colorThemeSave)}
				</button>
			);
		}
	}

	render() {
		return <Col key="0">{this.renderChangeThemeButton()}</Col>;
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		colorThemeSave: state.profile.colorThemeSave
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
		onRandomColorTheme: () => {
			colorThemeDispatchers.generateRandomColorTheme();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangeThemeButton);
