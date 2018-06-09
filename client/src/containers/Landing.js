import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActions from '../actions/colorTheme';
import { bindActionCreators } from 'redux';
import Testimonials from './Testimonials';
import './Landing.css';
import {
	GREY_9,
	GREY_8,
	GREY_7,
	GREY_6,
	GREY_2,
	GREY_1,
	RED_ORANGE_3,
	BLUE_3
} from './styles/ColorConstants';
import { Layout, Button, Row, Col, Icon } from 'antd';
const { Content } = Layout;

class Landing extends Component {
	state = {
		displayText: 'Source'
	};

	componentWillMount() {
		// run once before first render()

		this.props.onSignedInLanding();
	}

	onClickSource() {
		if (
			this.state.displayText === 'Source' ||
			this.state.displayText === 'Highly vetted source'
		) {
			this.setState({
				displayText: 'Above statistics are made up but highly accurate'
			});
		} else {
			this.setState({
				displayText: 'Highly vetted source'
			});
		}
	}

	renderCartoons() {
		document.documentElement.style.setProperty(`--progress-color`, GREY_6);

		document.documentElement.style.setProperty(
			`--progress-remaining-color`,
			GREY_8
		);

		return (
			<div>
				<Row
					style={{
						padding: '150px 0px 0px' // top left&right bottom
					}}
					type="flex"
					justify="space-around"
					align="top"
				>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 6 }}
						xl={{ span: 4 }}
					>
						<h2
							style={{
								textAlign: 'center',
								color: GREY_2
							}}
						>
							Online class alone
						</h2>
						<Row type="flex" justify="center">
							<Col>
								<img
									alt=""
									style={{ height: '240px' }}
									src="https://user-images.githubusercontent.com/2585159/40999312-1c66c9ea-68d0-11e8-9528-4fe4123070d3.png"
								/>
							</Col>
						</Row>
					</Col>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 14 }}
						md={{ span: 16 }}
						lg={{ span: 11 }}
						xl={{ span: 9 }}
					>
						<h2
							style={{
								textAlign: 'center',
								color: GREY_2
							}}
						>
							Online class through infinity2o
						</h2>
						<Row type="flex" justify="center">
							<Col>
								<img
									alt=""
									style={{ height: '300px' }}
									src="https://user-images.githubusercontent.com/2585159/40999319-20ee0d16-68d0-11e8-900a-0c239b422906.png"
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}

	renderMarketingInfo() {
		const why_part_0 =
			'Meet people with similar beliefs to take online courses with.';

		return (
			<div>
				{this.renderCartoons()}
				<Row
					type="flex"
					justify="center"
					style={{ padding: '70px 0px 0px' }}
				>
					<Col>
						<h1
							key="0"
							style={{
								textAlign: 'center',
								color: GREY_1,
								fontSize: 35
							}}
						>
							{why_part_0}
						</h1>
					</Col>
				</Row>
			</div>
		);
	}

	renderTestimonials() {
		return (
			<Row
				style={{
					padding: '160px 0px 0px' // top left&right bottom
				}}
				type="flex"
				justify="center"
				align="top"
			>
				<Col
					xs={{ span: 24 }}
					sm={{ span: 14 }}
					md={{ span: 10 }}
					lg={{ span: 8 }}
					xl={{ span: 6 }}
				>
					<Testimonials />
				</Col>
			</Row>
		);
	}

	renderLogin() {
		const { auth } = this.props;

		const why_part_2 =
			"Join Earth's largest community of learning partners.";
		switch (auth.loggedInState) {
			case 'not_logged_in':
				return (
					<div>
						<Row
							style={{
								padding: '80px 0px 0px' // top left&right bottom
							}}
							type="flex"
							justify="center"
						>
							<Col>
								<h2
									key="0"
									style={{
										textAlign: 'center',
										color: GREY_7
									}}
								>
									{why_part_2}
								</h2>
							</Col>
						</Row>
						<Row
							style={{
								padding: '1px 0px 0px' // top left&right bottom
							}}
							type="flex"
							justify="space-around"
						>
							<Col
								xs={{ span: 0 }}
								sm={{ span: 3, offset: 0 }}
								md={{ span: 5, offset: 0 }}
								lg={{ span: 7, offset: 0 }}
								xl={{ span: 8, offset: 0 }}
							/>
							<Col
								style={{
									padding: '10px 0px 0px' // top left&right bottom
								}}
								xs={{ span: 12 }}
								sm={{ span: 9, offset: 0 }}
								md={{ span: 7, offset: 0 }}
								lg={{ span: 5, offset: 0 }}
								xl={{ span: 4, offset: 0 }}
							>
								<Button
									size="large"
									key="-1"
									style={{
										borderColor: RED_ORANGE_3,
										background: RED_ORANGE_3,
										color: GREY_9
									}}
								>
									<a href="/auth/google">
										Gmail Login{' '}
										<Icon
											style={{ fontSize: 18 }}
											type="google"
										/>
									</a>
								</Button>
							</Col>
							<Col
								style={{
									padding: '10px 0px 0px' // top left&right bottom
								}}
								xs={{ span: 13 }}
								sm={{ span: 9, offset: 0 }}
								md={{ span: 7, offset: 0 }}
								lg={{ span: 4, offset: 0 }}
								xl={{ span: 3, offset: 0 }}
							>
								<Button
									size="large"
									key="0"
									style={{
										borderColor: BLUE_3,
										background: BLUE_3,
										color: GREY_9
									}}
								>
									<a href="/auth/linkedIn">
										LinkedIn Login{' '}
										<Icon
											style={{ fontSize: 18 }}
											type="linkedin"
										/>
									</a>
								</Button>
							</Col>
							<Col
								xs={{ span: 0 }}
								sm={{ span: 3, offset: 0 }}
								md={{ span: 5, offset: 0 }}
								lg={{ span: 7, offset: 0 }}
								xl={{ span: 8, offset: 0 }}
							/>
						</Row>
					</div>
				);
			default:
				return;
		}
	}

	render() {
		//console.log('this.props inside Landing', this.props);
		return (
			<div>
				<Content
					style={{
						height: '100vh',
						background: GREY_9
					}}
				>
					{this.renderMarketingInfo()}
				</Content>
				<Content
					style={{
						padding: '0px 50px 50px', // top left&right bottom
						background: GREY_1
					}}
				>
					{this.renderTestimonials()}
					{this.renderLogin()}
				</Content>
			</div>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const customHeaderDispatchers = bindActionCreators(
		colorThemeActions,
		dispatch
	);

	return {
		onSignedInLanding: () => {
			customHeaderDispatchers.onSignedInLanding();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
