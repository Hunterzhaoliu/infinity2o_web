import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";
import "./general-header-button.css";

class LogoutButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<Col>
				<a className="header-anchor" href="/api/logout">
					<button
						className="general-header-button"
						style={{ color: colorTheme.text6Color }}
					>
						Logout
					</button>
				</a>
			</Col>
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
