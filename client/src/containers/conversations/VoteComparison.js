import _ from "lodash";
import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
// import "./testimonial-theme.css";
// import "./testimonial.css";
import { Row, Col, Card, Avatar } from "antd";

function SampleNextArrow() {
	return <div />;
}

function SamplePrevArrow() {
	return <div />;
}

class VoteComparison extends Component {
	renderAgreedAsks() {
		const { colorTheme, agreedAsks, userPictureURL } = this.props;
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
							borderColor: colorTheme.text2Color,
							background: colorTheme.text2Color
						}}
					>
						<p
							style={{
								color: colorTheme.backgroundColor
							}}
						>
							{agreedAsk.question}
						</p>
						<Avatar
							size="large"
							src={userPictureURL}
							style={{
								width: 50,
								height: 50
							}}
						/>
						{/* <Avatar
							size="large"
							src={contactPictureURL}
							style={{
								width: 50,
								height: 50
							}}
						/> */}
						<p
							style={{
								color: colorTheme.backgroundColor
							}}
						>
							{agreedAsk.userAndContactAnswer}
						</p>
					</Card>
				</div>
			);
		});
	}

	renderDisagreedAsks() {
		const { colorTheme, disagreedAsks, userPictureURL } = this.props;
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
							borderColor: colorTheme.text2Color,
							background: colorTheme.text2Color
						}}
					>
						<p
							style={{
								color: colorTheme.backgroundColor
							}}
						>
							{disagreedAsk.question}
						</p>
						{/* <Avatar
							size="large"
							src={contactPictureURL}
							style={{
								width: 50,
								height: 50
							}}
						/> */}
						<p
							style={{
								color: colorTheme.backgroundColor
							}}
						>
							{disagreedAsk.contactAnswer}
						</p>
						<Avatar
							size="large"
							src={userPictureURL}
							style={{
								width: 50,
								height: 50
							}}
						/>
						<p
							style={{
								color: colorTheme.backgroundColor
							}}
						>
							{disagreedAsk.userAnswer}
						</p>
					</Card>
				</div>
			);
		});
	}

	render() {
		const settings = {
			dots: true,
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
			pauseOnDotsHover: true,
			pauseOnFocus: true
		};

		return (
			<Row>
				<Slider {...settings}>{this.renderAgreedAsks()}</Slider>
				<Slider {...settings}>{this.renderDisagreedAsks()}</Slider>
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		agreedAsks: state.contacts.selectedConversationInfo.agreedAsks,
		disagreedAsks: state.contacts.selectedConversationInfo.disagreedAsks,
		userPictureURL: state.profile.imageUrl
		// contactPictureURL:
		// 	state.contacts.selectedConversationInfo.selectedContactMongoDBInfo
		// 		.imageUrl
	};
}

export default connect(mapStateToProps, null)(VoteComparison);
