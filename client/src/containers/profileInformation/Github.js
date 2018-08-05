import React, { Component } from "react";
import { GREY_3 } from "../styles/ColorConstants";
import { connect } from "react-redux";
import { Col, Icon } from "antd";

class Github extends Component {
	render() {
		const { value, colorTheme, loggedInState } = this.props;
		let textColor = colorTheme.text2Color;
		if (loggedInState === "not_logged_in") {
			textColor = GREY_3;
		}
		if (value !== undefined && value !== null) {
			return (
				<Col>
					<a href={value} target="_blank">
						<Icon
							alt="Github: "
							style={{
								fontSize: "25px",
								color: textColor
							}}
							type="github"
						/>
					</a>
				</Col>
			);
		} else {
			return <div />;
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
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);
