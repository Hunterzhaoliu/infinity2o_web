import React, { Component } from "react";
import { connect } from "react-redux";
// import "./general-header-button.css";

class TourButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
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
