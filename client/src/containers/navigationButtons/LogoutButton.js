import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";

class LogoutButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<Col>
				<button>
					<a
						style={{ color: colorTheme.text4Color }}
						href="/api/logout"
					>
						Logout
					</a>
				</button>
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
