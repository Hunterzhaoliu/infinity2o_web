import _ from "lodash";
import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { Row, Col, Card, Avatar } from "antd";
import "./vote-comparison.css";

function SampleNextArrow() {
	return <div />;
}

function SamplePrevArrow() {
	return <div />;
}

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
			agreedAsks,
			userPictureURL,
			contactPictureURL
		} = this.props;
		return _.map(agreedAsks, (agreedAsk, index) => {
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
									{this.renderAvatar(contactPictureURL)}
								</div>
								<div>{this.renderAvatar(userPictureURL)}</div>
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
		});
	}

	renderDisagreedAsks() {
		const {
			colorTheme,
			disagreedAsks,
			userPictureURL,
			contactPictureURL
		} = this.props;
		return _.map(disagreedAsks, (disagreedAsk, index) => {
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
							<Col>{this.renderAvatar(contactPictureURL)}</Col>
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
		});
	}

	render() {
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
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
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
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		agreedAsks: state.contacts.selectedConversationInfo.agreedAsks,
		disagreedAsks: state.contacts.selectedConversationInfo.disagreedAsks,
		userPictureURL: state.profile.imageUrl,
		contactPictureURL:
			state.contacts.selectedConversationInfo.selectedContactMongoDBInfo
				.imageUrl
	};
}

export default connect(mapStateToProps, null)(VoteComparison);
