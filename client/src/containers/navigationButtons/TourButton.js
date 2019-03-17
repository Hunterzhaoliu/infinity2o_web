import React, { Component } from "react";
import { connect } from "react-redux";
import "./general-header-button.css";

class TourButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<a className="header-anchor" href="/tour">
				<button
					className="general-header-button"
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
