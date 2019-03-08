import React, { Component } from "react";
import { connect } from "react-redux";
import "./general-header-button.css";

class ProfileButton extends Component {
	render() {
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
