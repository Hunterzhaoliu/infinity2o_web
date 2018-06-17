import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActions from '../../actions/colorTheme';
import * as landingActions from '../../actions/landing';
import { bindActionCreators } from 'redux';
import Testimonials from './Testimonials';
import './Landing.css';
import {
	GREY_9,
	GREY_8,
	GREY_7,
	GREY_6,
	GREY_2,
	GREY_1
} from '../styles/ColorConstants';
import LoginButtons from './LoginButtons';
import InputVote from '../sorting_hat/InputVote';
import MatchCards from '../matches/MatchCards';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class Landing extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchLandingPageSortingHatAsks();
	}

	componentWillReceiveProps(nextProps) {
		// determines if logged_in_landing or logged_out_landing page
		if (nextProps.loggedInState !== this.props.loggedInState) {
			this.props.onLanding(nextProps.loggedInState);
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
					justify="center"
					align="top"
				>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 6 }}
						xl={{ span: 5 }}
					>
						<Row type="flex" justify="center">
							<Col
								xs={{ span: 7, offset: 4 }}
								sm={{ span: 14, offset: 4 }}
								md={{ span: 15, offset: 4 }}
								lg={{ span: 15, offset: 4 }}
								xl={{ span: 15, offset: 4 }}
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
								xs={{ span: 3 }}
								sm={{ span: 5 }}
								md={{ span: 5 }}
								lg={{ span: 5 }}
								xl={{ span: 5 }}
							>
								<div className="arrow">
									<img
										alt=""
										style={{
											padding: '180px 0px 0px',
											height: '195px'
										}}
										src="https://user-images.githubusercontent.com/24757872/41196729-b7ea3038-6c0d-11e8-8b2f-cb4c4fe4afb7.png"
									/>
								</div>
								<p
									style={{
										color: GREY_1,
										padding: '2px 0px 0px 28px',
										textAlign: 'center'
									}}
								>
									invisible chair
								</p>
							</Col>
						</Row>
					</Col>
					<Col
						xs={{ span: 24 }}
						sm={{ span: 14 }}
						md={{ span: 16 }}
						lg={{ span: 11 }}
						xl={{ span: 9, offset: 3 }}
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
					padding: '40px 0px 0px' // top left&right bottom
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
		const { loggedInState } = this.props;

		const why_part_2 =
			"Join Earth's largest community of learning partners.";
		switch (loggedInState) {
			case 'not_logged_in':
				return (
					<div>
						<Row
							style={{
								padding: '40px 0px 0px' // top left&right bottom
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
						<LoginButtons />
					</div>
				);
			default:
				return;
		}
	}

	renderLandingAsks() {
		const how_part_0 =
			'Find the best matches by expressing your beliefs to the Sorting Hat';
		const how_part_1 = 'by voting or asking questions';

		return (
			<div>
				<Row
					type="flex"
					justify="center"
					style={{ padding: '20px 0px 0px' }}
				>
					<Col>
						<h1
							style={{
								textAlign: 'center',
								color: GREY_9,
								fontSize: 35
							}}
						>
							{how_part_0}{' '}
							<img
								alt=""
								style={{
									width: 50,
									padding: '0px 0px 5px 5px'
								}}
								src="https://user-images.githubusercontent.com/24757872/40881487-37bb7a50-668d-11e8-8d2e-d3be80bdef09.png"
							/>
						</h1>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<h1
							style={{
								textAlign: 'center',
								color: GREY_7,
								fontSize: 25
							}}
						>
							{how_part_1}
						</h1>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="middle"
					style={{
						textAlign: 'center',
						padding: '20px 0px 0px 0px'
					}}
				>
					<Col>
						<InputVote />
					</Col>
				</Row>
			</div>
		);
	}

	renderMatches() {
		const how_part_2 = 'Chat with the matches you want to learn with';

		return (
			<div>
				<Row
					type="flex"
					justify="center"
					style={{ padding: '30px 0px 0px' }}
				>
					<Col>
						<h1
							style={{
								textAlign: 'center',
								color: GREY_1,
								fontSize: 35
							}}
						>
							{how_part_2}
						</h1>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="middle"
					style={{
						textAlign: 'center',
						padding: '20px 0px 0px 0px'
					}}
				>
					<Col>
						<MatchCards />
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		//console.log('this.props inside Landing', this.props);
		return (
			<div>
				<Content
					style={{
						height: '96vh',
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
					{this.renderLandingAsks()}
				</Content>
				<Content
					style={{
						padding: '0px 50px 50px', // top left&right bottom
						background: GREY_9
					}}
				>
					{this.renderMatches()}
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
		loggedInState: state.auth.loggedInState
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const landingDispatchers = bindActionCreators(landingActions, dispatch);
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActions,
		dispatch
	);
	return {
		fetchLandingPageSortingHatAsks: () => {
			landingDispatchers.fetchLandingPageSortingHatAsks();
		},
		onLanding: loggedInState => {
			colorThemeDispatchers.onLanding(loggedInState);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
