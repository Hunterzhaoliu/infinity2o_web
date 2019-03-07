import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";
import "./general-header-button.css";

class ProfileButton extends Component {
	renderProfileButton() {
		const { colorTheme } = this.props;
		return (
			<button
				style={{
					borderBottom: "3px solid " + colorTheme.profileButtonColor
				}}
			>
				<a
					style={{
						color: colorTheme.profileButtonColor
					}}
					href="/profile"
				>
					Profile
				</a>
			</button>
		);
	}

	render() {
		return (
			<Col
				md={{ offset: 1 }}
				lg={{ offset: 1 }}
				xl={{ offset: 1 }}
				key="2"
			>
				{this.renderProfileButton()}
			</Col>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme
	};
}

export default connect(
	mapStateToProps,
	null
)(ProfileButton);
