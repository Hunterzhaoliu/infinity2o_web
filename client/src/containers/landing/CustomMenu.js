import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import TourButton from "../navigationButtons/TourButton";
import ProfileButton from "../navigationButtons/ProfileButton";
import SortingHatButton from "../navigationButtons/SortingHatButton";
import MatchesButton from "../navigationButtons/MatchesButton";
import ConversationButton from "../navigationButtons/ConversationButton";
import LogoutButton from "../navigationButtons/LogoutButton";

const { Content } = Layout;

class CustomMenu extends Component {
	render() {
		const { colorTheme, windowWidth, menuIsDisplayed } = this.props;
		if (windowWidth < 768 && menuIsDisplayed) {
			return (
				<Content
					style={{
						borderColor: colorTheme.text8Color,
						background: colorTheme.text8Color
					}}
				>
					<TourButton />
					<ProfileButton />
					<SortingHatButton />
					<MatchesButton />
					<ConversationButton />
					<LogoutButton />
				</Content>
			);
		} else {
			return <div />;
		}
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		windowWidth: state.customHeader.windowWidth,
		menuIsDisplayed: state.customHeader.menuIsDisplayed
	};
}

export default connect(
	mapStateToProps,
	null
)(CustomMenu);
