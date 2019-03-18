import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Row, Col } from "antd";
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
						background: colorTheme.text8Color,
						padding: "60px 0px 0px 0px",
						position: "fixed",
						width: "100%",
						height: "100%",
						zIndex: 1
					}}
				>
					<Row type="flex" justify="center">
						<Col>
							<TourButton />
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col>
							<ProfileButton />
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col>
							<SortingHatButton />
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col>
							<MatchesButton />
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col>
							<ConversationButton />
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col>
							<LogoutButton />
						</Col>
					</Row>
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
