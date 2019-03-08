import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";
import "./general-header-button.css";

class ProfileButton extends Component {
	render() {
		const { colorTheme } = this.props;
		return (
			<Col>
				<a href="/profile">
					<button
						style={{
							borderBottom:
								"3px solid " + colorTheme.profileButtonColor,
							color: colorTheme.profileButtonColor
						}}
					>
						Profile
					</button>
				</a>
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
