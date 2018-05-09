import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActions from '../actions/colorTheme';
import { bindActionCreators } from 'redux';
import anime from 'animejs';
import { Layout, Button, Row, Col, Icon, Card } from 'antd';
const { Content } = Layout;

const testimonials = [
	{
		testimonial:
			'I love taking classes from Coursera but could never find ' +
			'the motivation to finish one. But after meeting someone ' +
			'from infinity2o we finished the Coursera Deep Learning ' +
			'class together. ~ Q'
	},
	{
		testimonial:
			'Ya I got caught with too much cocaine in my pants so had ' +
			'to drop out of high school. Now I take online classes' +
			'with strangers. ~ Hunter'
	}
];

class Landing extends Component {
	componentWillMount() {
		// run once before first render()

		this.props.onSignedInLanding();
	}

	renderTestimonials() {
		const { colorTheme } = this.props;

		return (
			<div>
				<Card
					hoverable={true}
					borderded="false"
					loading={false}
					style={{
						width: '314px',
						textAlign: 'center',
						borderColor: colorTheme.text8Color,
						background: colorTheme.text8Color
					}}
				>
					<p
						style={{
							color: colorTheme.text3Color
						}}
					>
						{testimonials[0]['testimonial']}
					</p>
				</Card>
			</div>
		);
	}

	renderMarketingInfo() {
		const { colorTheme, auth } = this.props;
		const why_part_0 =
			'Meet new & interesting people to take online courses with.';
		const why_part_1 =
			'Each month, 1000+ students come to Infinity2o to vote, match, & learn from Coursera, edX, Udemy, & Udacity together.';

		switch (auth.loggedInState) {
			case 'not_logged_in':
				return (
					<div>
						<Row type="flex" justify="center">
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
						<Row type="flex" justify="center">
							<Col>
								<h2
									key="0"
									style={{
										textAlign: 'center',
										color: colorTheme.text3Color
									}}
								>
									{why_part_1}
								</h2>
							</Col>
						</Row>
						<Row
							style={{
								padding: '3% 0% 0%' // top left&right bottom
							}}
							type="flex"
							justify="center"
						>
							<Col>{this.renderTestimonials()}</Col>
						</Row>
					</div>
				);
			default:
				// logged in
				return (
					<div>
						<Row type="flex" justify="center">
							<Col>
								<h1
									key="0"
									style={{
										color: colorTheme.text2Color
									}}
								>
									{why_part_0}
								</h1>
							</Col>
						</Row>
					</div>
				);
		}
	}

	renderLogin() {
		const { colorTheme, auth } = this.props;

		const why_part_2 = "Join Earth's largest online student community.";
		switch (auth.loggedInState) {
			case 'not_logged_in':
				return (
					<div>
						<Row
							style={{
								padding: '3% 0% 0%' // top left&right bottom
							}}
							type="flex"
							justify="center"
						>
							<Col>
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
								padding: '1% 0% 0%' // top left&right bottom
							}}
							type="flex"
							justify="space-around"
						>
							<Col
								sm={{ span: 3, offset: 0 }}
								md={{ span: 5, offset: 0 }}
								lg={{ span: 7, offset: 0 }}
								xl={{ span: 8, offset: 0 }}
							/>
							<Col
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
										Google Login{' '}
										<Icon
											style={{ fontSize: 18 }}
											type="google"
										/>
									</a>
								</Button>
							</Col>
							<Col
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
					padding: '120px 50px 50px', // top left&right bottom
					minHeight: 720,
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
