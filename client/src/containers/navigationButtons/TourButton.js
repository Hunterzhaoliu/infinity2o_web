import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";
import "./general-header-button.css";

class TourButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<Col
				md={{ offset: 1 }}
				lg={{ offset: 3 }}
				xl={{ offset: 2 }}
				key="1"
			>
				<button
					style={{
						borderBottom: "3px solid " + colorTheme.tourButtonColor
					}}
				>
					<a
						style={{
							color: colorTheme.tourButtonColor
						}}
						href="/tour"
					>
						Tour
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
)(TourButton);
