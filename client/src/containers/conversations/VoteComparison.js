import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as contactsActionCreators from "../../actions/conversations/contacts";
import { bindActionCreators } from "redux";
import Slider from "react-slick";
import { Row, Col, Card } from "antd";
import "./vote-comparison.css";
import dolphin from "../images/dolphin.jpg";

class VoteComparison extends Component {
	renderPicture(pictureUrl) {
		const { colorTheme } = this.props;
		if (pictureUrl === undefined || pictureUrl === null) {
			pictureUrl = dolphin;
		}
		return (
			<img
				style={{
					border: "2px solid " + colorTheme.textDot5Color
				}}
				onError={error => {
					// in case the imageUrl is invalid
					error.target.onerror = null;
					error.target.src = dolphin;
				}}
				className="vote-comparison-img"
				src={pictureUrl}
				alt=""
			/>
		);
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
							borderded="false"
							loading={false}
							style={{
								borderColor: colorTheme.textDot5Color,
								background: colorTheme.textDot5Color
							}}
							bodyStyle={{ padding: "30px" }}
						>
							<Row type="flex" justify="center" align="middle">
								<Col>
									<h3
										className="vote-comparison-h3"
										style={{
											color: colorTheme.text3Color
										}}
									>
										{agreedAsk.question}
									</h3>
								</Col>
							</Row>
							<Row
								style={{ padding: "15px 0px 0px 0px" }}
								type="flex"
								justify="center"
								align="middle"
							>
								<Col offset={2}>
									<div className="vote-comparison-contact-picture">
										{this.renderPicture(
											selectedConversationInfo
												.selectedContactMongoDBInfo
												.imageUrl
										)}
									</div>
									{this.renderPicture(userPictureURL)}
								</Col>
								<Col offset={3}>
									<h5
										className="vote-comparison-h5"
										style={{
											color: colorTheme.keyText7Color
										}}
									>
										{agreedAsk.userAndContactAnswer}
									</h5>
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
							borderded="false"
							loading={false}
							style={{
								borderColor: colorTheme.textDot5Color,
								background: colorTheme.textDot5Color
							}}
							bodyStyle={{ padding: "30px" }}
						>
							<Row type="flex" justify="center" align="middle">
								<Col>
									<h3
										className="vote-comparison-h3"
										style={{
											color: colorTheme.text3Color
										}}
									>
										{disagreedAsk.question}
									</h3>
								</Col>
							</Row>
							<Row
								style={{ padding: "15px 0px 0px" }}
								type="flex"
								justify="center"
								align="middle"
							>
								<Col>
									{this.renderPicture(
										selectedConversationInfo
											.selectedContactMongoDBInfo.imageUrl
									)}
								</Col>
								<Col offset={2}>
									<h5
										className="vote-comparison-h5"
										style={{
											color: colorTheme.keyText8Color
										}}
									>
										{disagreedAsk.contactAnswer}
									</h5>
								</Col>
							</Row>
							<Row type="flex" justify="center" align="middle">
								<Col>{this.renderPicture(userPictureURL)}</Col>
								<Col offset={2}>
									<h5
										className="vote-comparison-h5"
										style={{
											color:
												colorTheme.keyCompliment1Text8Color
										}}
									>
										{disagreedAsk.userAnswer}
									</h5>
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
			<div>
				<Row>
					<Col>
						<Slider {...settings}>{this.renderAgreedAsks()}</Slider>
					</Col>
				</Row>
				<Row style={{ padding: "30px 0px 0px 0px" }}>
					<Col>
						<Slider {...settings}>
							{this.renderDisagreedAsks()}
						</Slider>
					</Col>
				</Row>
				<Row style={{ padding: "30px 0px 0px 0px" }}>
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
