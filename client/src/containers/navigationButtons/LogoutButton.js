import React, { Component } from "react";
import { connect } from "react-redux";
import "./general-header-button.css";

class LogoutButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<button>
				<a style={{ color: colorTheme.text4Color }} href="/api/logout">
					Logout
				</a>
			</button>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme
	};
}

export default connect(
	mapStateToProps,
	null
)(LogoutButton);
