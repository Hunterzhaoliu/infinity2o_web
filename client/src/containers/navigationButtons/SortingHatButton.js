import React, { Component } from "react";
import { connect } from "react-redux";

class SortingHatButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<button
				style={{
					borderBottom:
						"3px solid " + colorTheme.sortingHatButtonColor
				}}
			>
				<a
					style={{
						color: colorTheme.sortingHatButtonColor
					}}
					href="/sorting_hat"
				>
					Sorting Hat
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
)(SortingHatButton);
