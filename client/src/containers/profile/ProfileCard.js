import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Avatar, Card } from "antd";
import LinkedIn from "../profileInformation/LinkedIn";
import Github from "../profileInformation/Github";
import Neurons from "../profileInformation/Neurons";
import Interests from "../profileInformation/Interests";
import Email from "../profileInformation/Email";
import TimeZone from "../profileInformation/TimeZone";

import "./profile-card.css";

class ProfileCard extends Component {
	renderNameAndAge() {
		const { profile } = this.props;
		if (profile.age !== undefined) {
			return profile.name + ", " + profile.age;
		} else {
			return profile.name;
		}
	}

	render() {
		const { colorTheme, profile } = this.props;
		return (
			<Row type="flex" justify="center">
				<Col xl={{ span: 8 }}>
					<Card
						bordered="false"
						loading={false}
						style={{
							color: colorTheme.text1Color,
							borderColor: colorTheme.text05Color,
							background: colorTheme.text05Color
						}}
						bodyStyle={{ padding: "0px" }} // padding around inside border of card
					>
						<Row type="flex" justify="center">
							<div
								style={{
									width: "100%",
									height: "130px",
									backgroundColor: colorTheme.key
								}}
							/>
							<Avatar
								style={{
									position: "absolute",
									top: "50px"
								}}
								shape="circle"
								src={profile.imageUrl}
							/>
						</Row>
						<Row
							style={{ padding: "90px 0px 20px 0px" }}
							type="flex"
							justify="center"
							align="middle"
						>
							<Col>
								<p
									style={{
										color: colorTheme.keyText6Color,
										fontFamily: "Overpass",
										lineHeight: 1,
										marginBottom: 0,
										fontSize: 26
									}}
								>
									{this.renderNameAndAge()}
								</p>
							</Col>
							<LinkedIn
								value={profile.linkedInPublicProfileUrl}
							/>
							<Github value={profile.githubPublicProfileUrl} />
						</Row>
						<Neurons payment={profile.payment} />
						<Row>
							<Interests interests={profile.interests} />
						</Row>
						<Row>
							<Email email={profile.email} />
						</Row>
						<Row>
							<TimeZone timeZone={profile.timeZone} />
						</Row>
						<Row type="flex" justify="center">
							<Col style={{ padding: "20px 0px 60px 0px" }}>
								<a
									className="profile-edit-anchor"
									style={{
										borderColor: colorTheme.backgroundColor,
										background: colorTheme.backgroundColor,
										color: colorTheme.text3Color
									}}
									href="/profile/edit"
								>
									Edit Info
								</a>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		);
	}
}
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

export default connect(
	mapStateToProps,
	null
)(ProfileCard);
