import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActionCreators from '../../actions/auth';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import Options from '../payment/Options';
import DisplayField from './DisplayField';
import DisplayLinkField from './DisplayLinkField';
import { Layout, Row, Col, Button } from 'antd';
const { Content } = Layout;

class Profile extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserProfile();
		this.props.onProfile();
	}

	renderProfile() {
		const { colorTheme, profile } = this.props;

		let neuronsInBillions = profile.payment.neuronsInBillions;
		if (neuronsInBillions !== undefined) {
			neuronsInBillions = neuronsInBillions.toFixed(1);
		}
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col>
						<h2
							style={{
								color: colorTheme.keyText6Color
							}}
						>
							Profile:
						</h2>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayField
							label="Neurons: "
							value={neuronsInBillions}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayField label="Name: " value={profile.name} />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '0% 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayField label="E-mail: " value={profile.email} />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayField label="Age: " value={profile.age} />
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayField
							label="Interest(s): "
							value={profile.interests}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayLinkField
							label="LinkedIn: "
							value={profile.linkedInPublicProfileUrl}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayLinkField
							label="Github: "
							value={profile.githubPublicProfileUrl}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayLinkField
							label="Website: "
							value={profile.websiteUrl}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayField
							label="Time Zone: "
							value={profile.timeZone}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col span={24}>
						<DisplayField
							label="Availability: "
							value={profile.availability}
						/>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: '5px 0% 0%' // top left&right bottom
					}}
				>
					<Col>
						<Button
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
						>
							<a href="/profile/edit">Edit</a>
						</Button>
					</Col>
				</Row>
			</div>
		);
	}

	renderQuestions(asks, colorTheme) {
		if (asks != null) {
			const newest5Questions = asks.questions.slice(-5).reverse();
			return _.map(newest5Questions, (question, key) => {
				return (
					<Row key={key}>
						<Col span={24}>
							<h3
								style={{
									color: colorTheme.text6Color
								}}
							>
								{question.question}
							</h3>
						</Col>
					</Row>
				);
			});
		}
	}

	renderVotes(asks, colorTheme) {
		if (asks != null) {
			const newest5Votes = asks.votes.slice(-5).reverse();
			return _.map(newest5Votes, (vote, key) => {
				return (
					<div key={key}>
						<Row type="flex" justify="start" align="middle">
							<Col
								sm={{ span: 5 }}
								md={{ span: 5 }}
								lg={{ span: 5 }}
								xl={{ span: 5 }}
							>
								<h3
									style={{
										color: colorTheme.text6Color
									}}
								>
									{vote.question}
								</h3>
							</Col>
							<Col
								sm={{ span: 18, offset: 1 }}
								md={{ span: 18, offset: 1 }}
								lg={{ span: 18, offset: 1 }}
								xl={{ span: 18, offset: 1 }}
							>
								<h3
									style={{
										color: colorTheme.text6Color
									}}
								>
									{vote.selectedAnswer}
								</h3>
							</Col>
						</Row>
					</div>
				);
			});
		}
	}

	renderPurchaseNeurons() {
		const { colorTheme } = this.props;
		return (
			<div
				style={{
					padding: '25px 0px 0px' // top left&right bottom
				}}
			>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 0 }}
						xl={{ span: 0 }}
					/>
					<Col
						sm={{ span: 24 }}
						md={{ span: 19 }}
						lg={{ span: 19 }}
						xl={{ span: 19 }}
					>
						<h2
							style={{
								color: colorTheme.keyText6Color
							}}
						>
							Purchase Neurons:
						</h2>
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					/>
				</Row>
				<Row type="flex" justify="start" align="middle">
					<Col>
						<Options />
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		const { colorTheme, profile } = this.props;
		return (
			<Content
				style={{
					padding: '75px 50px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 0 }}
						md={{ span: 0 }}
						lg={{ span: 0 }}
						xl={{ span: 0 }}
					/>
					<Col
						sm={{ span: 24 }}
						md={{ span: 19 }}
						lg={{ span: 19 }}
						xl={{ span: 19 }}
					>
						{this.renderProfile()}
						{this.renderPurchaseNeurons()}
						<Row>
							<h2
								style={{
									padding: '25px 0% 0%', // top left&right bottom
									color: colorTheme.keyText6Color
								}}
							>
								Last 5 Questions
							</h2>
						</Row>
						{this.renderQuestions(profile.asks, colorTheme)}
						<Row>
							<h2
								style={{
									padding: '25px 0% 0%', // top left&right bottom
									color: colorTheme.keyText6Color
								}}
							>
								Last 5 Votes
							</h2>
						</Row>
						{this.renderVotes(profile.asks, colorTheme)}
					</Col>
					<Col
						sm={{ span: 0 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					/>
				</Row>
			</Content>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const authDispatchers = bindActionCreators(authActionCreators, dispatch);
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);
	return {
		fetchUserProfile: () => {
			authDispatchers.fetchUserProfile();
		},
		onProfile: () => {
			colorThemeDispatchers.onProfile();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
