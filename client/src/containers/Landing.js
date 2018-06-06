import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActions from '../actions/colorTheme';
import { bindActionCreators } from 'redux';
import Testimonials from './Testimonials';
import './Landing.css';
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

	renderTestimonials() {
		const { colorTheme } = this.props;

		document.documentElement.style.setProperty(
			`--progress-color`,
			colorTheme.text6Color
		);

		document.documentElement.style.setProperty(
			`--progress-remaining-color`,
			colorTheme.text8Color
		);

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
						<Row type="flex" justify="center">
							<Col>
								<img
									alt=""
									style={{ width: '110px' }}
									src="https://user-images.githubusercontent.com/2585159/40999312-1c66c9ea-68d0-11e8-9528-4fe4123070d3.png"
								/>
							</Col>
						</Row>
						<h4
							style={{
								textAlign: 'center',
								color: colorTheme.text3Color
							}}
						>
							Taking an online class alone on an invisible chair
						</h4>
						<Progress
							percent={0}
							size="small"
							showInfo={false}
							status="active"
						/>
						<p
							style={{
								textAlign: 'center',
								color: colorTheme.text3Color
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
								color: colorTheme.text3Color
							}}
						>
							2.5% likely to finish your class
						</p>
						<Row type="flex" justify="center">
							<Col>
								<Button
									size="small"
									style={{
										borderColor: colorTheme.text8Color,
										background: colorTheme.text8Color,
										color: colorTheme.text7Color
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
						sm={{ span: 14 }}
						md={{ span: 10 }}
						lg={{ span: 8 }}
						xl={{ span: 6 }}
					>
						<Testimonials />
					</Col>
					<Col
						style={{
							padding: '20px 0px 0px' // top left&right bottom
						}}
						xs={{ span: 24 }}
						sm={{ span: 12 }}
						md={{ span: 8 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
					>
						<Row type="flex" justify="center">
							<Col>
								<img
									alt=""
									style={{ width: '300px' }}
									src="https://user-images.githubusercontent.com/2585159/40999319-20ee0d16-68d0-11e8-900a-0c239b422906.png"
								/>
							</Col>
						</Row>
						<h4
							style={{
								textAlign: 'center',
								color: colorTheme.text3Color
							}}
						>
							Taking an online class through infinity2o on 2
							invisible chairs
						</h4>
						<Progress
							percent={99}
							size="small"
							showInfo={false}
							status="active"
						/>
						<p
							style={{
								textAlign: 'center',
								color: colorTheme.text3Color
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
								color: colorTheme.text3Color
							}}
						>
							95% more likely to finish your class
						</p>
						<Row type="flex" justify="center">
							<Col>
								<Button
									size="small"
									style={{
										borderColor: colorTheme.text8Color,
										background: colorTheme.text8Color,
										color: colorTheme.text7Color
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

	renderMarketingInfo() {
		const { colorTheme } = this.props;
		const why_part_0 =
			'Meet interesting people with similar core beliefs to take online courses with.';

		return (
			<div>
				<Row
					type="flex"
					justify="center"
					style={{ padding: '20px 0px 0px 0px' }}
				>
					<Col>
						<h1
							key="0"
							style={{
								textAlign: 'center',
								color: colorTheme.text2Color
							}}
						>
							{why_part_0}
						</h1>
					</Col>
				</Row>
				{this.renderTestimonials()}
			</div>
		);
	}

	renderLogin() {
		const { colorTheme, auth } = this.props;

		const why_part_2 = "Join Earth's largest community of online learners.";
		switch (auth.loggedInState) {
			case 'not_logged_in':
				return (
					<div>
						<Row
							style={{
								padding: '0px 0px 0px' // top left&right bottom
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
										color: colorTheme.text3Color
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
										borderColor: colorTheme.key,
										background: colorTheme.key,
										color: colorTheme.text1Color
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
										borderColor: colorTheme.keyCompliment1,
										background: colorTheme.keyCompliment1,
										color: colorTheme.text1Color
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
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					padding: '55px 50px 50px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				{this.renderMarketingInfo()}
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
		colorTheme: state.colorTheme,
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
		onPressRandomColorTheme: () => {
			customHeaderDispatchers.generateRandomColorTheme();
		},
		onSignedInLanding: () => {
			customHeaderDispatchers.onSignedInLanding();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
