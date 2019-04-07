import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import Slider from "react-slick";
import { Row, Col, Card, Avatar } from "antd";
import "./vote-comparison.css";

class VoteComparison extends Component {
	renderAvatar(pictureURL) {
		if (pictureURL !== null) {
			return (
				<Avatar
					size="large"
					src={pictureURL}
					style={{
						width: 50,
						height: 50
					}}
				/>
			);
		}
	}
	renderAgreedAsks() {
		const {
			colorTheme,
			selectedConversationInfo,
			userPictureURL
		} = this.props;
		return _.map(
			selectedConversationInfo.agreedAsks,
			(agreedAsk, index) => {
				return (
					<div key={index}>
						<Card
							id="voteComparison"
							hoverable={true}
							borderded="false"
							loading={false}
							style={{
								textAlign: "center",
								borderColor: colorTheme.text8Color,
								background: colorTheme.text8Color
							}}
						>
							<Row type="flex" justify="center" align="middle">
								<Col>
									<p
										style={{
											color: colorTheme.text3Color,
											fontSize: "17px"
										}}
									>
										{agreedAsk.question}
									</p>
								</Col>
							</Row>
							<Row type="flex" justify="start" align="middle">
								<Col offset={2}>
									<div className="contact-picture">
										{this.renderAvatar(
											selectedConversationInfo
												.selectedContactMongoDBInfo
												.imageUrl
										)}
									</div>
									<div>
										{this.renderAvatar(userPictureURL)}
									</div>
								</Col>
								<Col offset={3}>
									<p
										style={{
											color: colorTheme.keyText5Color,
											fontSize: "15px"
										}}
									>
										{agreedAsk.userAndContactAnswer}
									</p>
								</Col>
							</Row>
						</Card>
					</div>
				);
			}
		);
	}

	renderDisagreedAsks() {
		const {
			colorTheme,
			userPictureURL,
			selectedConversationInfo
		} = this.props;
		return _.map(
			selectedConversationInfo.disagreedAsks,
			(disagreedAsk, index) => {
				return (
					<div key={index}>
						<Card
							id="voteComparison"
							hoverable={true}
							borderded="false"
							loading={false}
							style={{
								textAlign: "center",
								borderColor: colorTheme.text8Color,
								background: colorTheme.text8Color
							}}
						>
							<Row type="flex" justify="center" align="middle">
								<Col>
									<p
										style={{
											color: colorTheme.text3Color,
											fontSize: "17px"
										}}
									>
										{disagreedAsk.question}
									</p>
								</Col>
							</Row>
							<Row type="flex" justify="center" align="middle">
								<Col>
									{this.renderAvatar(
										selectedConversationInfo
											.selectedContactMongoDBInfo.imageUrl
									)}
								</Col>
								<Col offset={2}>
									<p
										style={{
											color: colorTheme.keyText5Color,
											fontSize: "15px"
										}}
									>
										{disagreedAsk.contactAnswer}
									</p>
								</Col>
							</Row>
							<Row type="flex" justify="center" align="middle">
								<Col>{this.renderAvatar(userPictureURL)}</Col>
								<Col offset={2}>
									<p
										style={{
											color: colorTheme.keyCompliment2,
											fontSize: "14px"
										}}
									>
										{disagreedAsk.userAnswer}
									</p>
								</Col>
							</Row>
						</Card>
					</div>
				);
			}
		);
	}

	render() {
		const { colorTheme, selectedConversationInfo } = this.props;
		const settings = {
			dots: false,
			adaptiveHeight: true,
			infinite: true,
			autoplay: true,
			pauseOnHover: true,
			speed: 500, // transition speed
			autoplaySpeed: 6000, // delay between each auto scroll (in milliseconds)
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			pauseOnDotsHover: false,
			pauseOnFocus: true
		};

		return (
			<div style={{ padding: "0px 5px 0px 5px" }}>
				<div style={{ padding: "0px 0px 10px 0px" }}>
					<Slider {...settings}>{this.renderAgreedAsks()}</Slider>
				</div>
				<div>
					<Slider {...settings}>{this.renderDisagreedAsks()}</Slider>
				</div>
				<Row style={{ padding: "20px 0px 0px 0px" }}>
					<Col>
						<button
							style={{
								borderColor: colorTheme.textDot5Color,
								background: colorTheme.textDot5Color,
								color: colorTheme.keyText8Color
							}}
							className="contact-information-button"
							onClick={e =>
								this.props.toggleBeliefComparison(
									selectedConversationInfo.showContactCard
								)
							}
						>
							Contact Info
						</button>
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		selectedConversationInfo: state.contacts.selectedConversationInfo,
		userPictureURL: state.profile.imageUrl
	};
}

function mapDispatchToProps(dispatch) {
	const contactsDispatchers = bindActionCreators(
		contactsActionCreators,
		dispatch
	);

	return {
		toggleBeliefComparison: showContactCard => {
			contactsDispatchers.toggleBeliefComparison(showContactCard);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VoteComparison);
