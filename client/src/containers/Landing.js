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
	GREY_3,
	GREY_2,
	GREY_1,
	RED_ORANGE_7,
	BLUE_7
} from './styles/ColorConstants';
import { Layout, Button, Row, Col, Icon, Progress } from 'antd';
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
						padding: '0px 0px 0px' // top left&right bottom
					}}
					type="flex"
					justify="space-around"
					align="top"
				>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 10 }}
						lg={{ span: 9 }}
						xl={{ span: 8 }}
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
						sm={{ span: 12 }}
						md={{ span: 12 }}
						lg={{ span: 11 }}
						xl={{ span: 10 }}
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
					padding: '200px 0px 0px' // top left&right bottom
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

	renderMarketingInfo2() {
		return (
			<div>
				<Row
					style={{
						padding: '10px 0px 0px' // top left&right bottom
					}}
					type="flex"
					justify="space-around"
					align="middle"
				>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
					>
						<Progress
							percent={0}
							size="small"
							showInfo={false}
							status="active"
						/>
						<p
							style={{
								textAlign: 'center',
								color: GREY_3
							}}
						>
							0% likely to make a new friend
						</p>
						<Progress
							percent={2.5}
							size="small"
							showInfo={false}
							status="active"
						/>
						<p
							style={{
								textAlign: 'center',
								color: GREY_3
							}}
						>
							2.5% likely to finish your class
						</p>
						<Row type="flex" justify="center">
							<Col>
								<Button
									size="small"
									style={{
										borderColor: GREY_8,
										background: GREY_8,
										color: GREY_7
									}}
								>
									<a
										href="https://shrm.org/hr-today/news/hr-magazine/Pages/0214-execbrief.aspx"
										target="_blank"
										rel="noopener noreferrer"
									>
										Source
									</a>
								</Button>
							</Col>
						</Row>
					</Col>
					<Col
						style={{
							padding: '10px 0px 0px' // top left&right bottom
						}}
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
					>
						<Progress
							percent={99}
							size="small"
							showInfo={false}
							status="active"
						/>
						<p
							style={{
								textAlign: 'center',
								color: GREY_3
							}}
						>
							99% more likely to make a new friend
						</p>
						<Progress
							percent={95}
							size="small"
							showInfo={false}
							status="active"
						/>
						<p
							style={{
								textAlign: 'center',
								color: GREY_3
							}}
						>
							95% more likely to finish your class
						</p>
						<Row type="flex" justify="center">
							<Col>
								<Button
									size="small"
									style={{
										borderColor: GREY_8,
										background: GREY_8,
										color: GREY_7
									}}
									onClick={e => this.onClickSource()}
								>
									{this.state.displayText}
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}

	renderLogin() {
		const { auth } = this.props;

		const why_part_2 = "Join Earth's largest community of online learners.";
		switch (auth.loggedInState) {
			case 'not_logged_in':
				return (
					<div>
						<Row
							style={{
								padding: '10px 0px 0px' // top left&right bottom
							}}
							type="flex"
							justify="center"
						>
							<Col
								style={{
									padding: '10px 0px 0px' // top left&right bottom
								}}
							>
								<h2
									key="0"
									style={{
										textAlign: 'center',
										color: GREY_3
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
										borderColor: RED_ORANGE_7,
										background: RED_ORANGE_7,
										color: GREY_1
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
										borderColor: BLUE_7,
										background: BLUE_7,
										color: GREY_1
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
			<Content
				style={{
					padding: '150px 50px 50px', // top left&right bottom
					background: GREY_9
				}}
			>
				{this.renderMarketingInfo()}
				{this.renderTestimonials()}
				{this.renderLogin()}
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
