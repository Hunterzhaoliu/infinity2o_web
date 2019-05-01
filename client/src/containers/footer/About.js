import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_1, GREY_9 } from "../styles/ColorConstants";
import { Layout, Row, Col } from "antd";
import { Helmet } from "react-helmet";
import "./about.css";

const { Content } = Layout;

class About extends Component {
	// renderTeam() {
	// 	const { teamMembers, colorTheme } = this.props;
	//
	// 	return _.map(teamMembers, teamMember => {
	// 		return (
	// 			<Col>
	// 				<h1 style={{ color: colorTheme.text2Color }}>Hi</h1>
	// 			</Col>
	// 		);
	// 	});
	// }

	render() {
		const { colorTheme, loggedInState } = this.props;

		let background = colorTheme.backgroundColor;
		let textColor = colorTheme.text1Color;
		if (loggedInState === "not_logged_in") {
			background = GREY_1;
			textColor = GREY_9;
		}

		return (
			<Content
				style={{
					textAlign: "center",
					padding: "120px 0px 0px",
					background: background
				}}
			>
				<Helmet>
					<title>About</title>
				</Helmet>
				<Row type="flex" justify="center">
					<Col>
						<h2 className="about-h2" style={{ color: textColor }}>
							About
						</h2>
					</Col>
				</Row>
				<Row
					style={{ padding: "30px 0px 0px 0px" }}
					type="flex"
					justify="center"
				>
					<Col>
						<h4
							className="about-h4"
							style={{
								color: colorTheme.text2Color
							}}
						>
							We believe the future of education can become better
							by following these principles:
						</h4>
					</Col>
				</Row>
			</Content>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		loggedInState: state.auth.loggedInState
	};
}

export default connect(
	mapStateToProps,
	null
)(About);
