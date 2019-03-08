import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";
import "./general-header-button.css";

class TourButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<Col md={{ offset: 1 }} lg={{ offset: 3 }} xl={{ offset: 2 }}>
				<a href="/tour">
					<button
						style={{
							boxShadow:
								"0px -3px 0px 0px " +
								colorTheme.tourButtonColor +
								" inset",
							color: colorTheme.tourButtonTextColor
						}}
					>
						Tour
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
)(TourButton);
