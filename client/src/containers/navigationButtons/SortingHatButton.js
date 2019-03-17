import React, { Component } from "react";
import { connect } from "react-redux";
import "./general-header-button.css";

class SortingHatButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<a className="header-anchor" href="/sorting_hat">
				<button
					className="general-header-button"
					style={{
						boxShadow:
							"0px -3px 0px 0px " +
							colorTheme.sortingHatButtonColor +
							" inset",
						color: colorTheme.sortingHatButtonTextColor
					}}
				>
					Sorting Hat
				</button>
			</a>
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
)(SortingHatButton);
