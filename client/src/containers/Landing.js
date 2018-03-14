import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import * as colorThemeActions from '../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout, Button, Row, Col, Icon } from 'antd';
const { Content } = Layout;

class Landing extends Component {
	componentWillMount() {
		// run once before first render()

		this.props.onSignedInLanding();
	}

	renderMarketingInfo() {
		const { colorTheme, auth } = this.props;
		const why_part_0 = `Online classes from `;
		const why_part_1 = `udacity.com`;
		const why_part_2 = `edx.org`;
		const why_part_3 = `udemy.com`;
		const why_part_4 = `coursera.org`;
		const why_part_5 = `the best teachers`;
		const why_part_6 = `are amazing but too lonely.`;

		const how = `Join our community and train an AI to find the best partners for you.`;
		const why = `Online classes from the best teachers are amazing but too lonely.`;
		switch (auth) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				// not logged in
				return (
					<div>
						<Row type="flex" justify="center">
							<Col
								sm={{ span: 0, offset: 0 }}
								md={{ span: 3, offset: 0 }}
								lg={{ span: 5, offset: 0 }}
								xl={{ span: 6, offset: 0 }}
							/>
							<Col
								sm={{ span: 13, offset: 0 }}
								md={{ span: 10, offset: 0 }}
								lg={{ span: 7, offset: 0 }}
								xl={{ span: 6, offset: 0 }}
							>
								<h1
									key="0"
									style={{
										color: colorTheme.text2Color
									}}
								>
									{why_part_0}
								</h1>
							</Col>
							<Col
								sm={{ span: 11, offset: 0 }}
								md={{ span: 8, offset: 0 }}
								lg={{ span: 6, offset: 0 }}
								xl={{ span: 5, offset: 0 }}
							>
								<h1
									key="0"
									style={{
										color: colorTheme.text2Color
									}}
								>
									<Typist
										avgTypingDelay={35}
										cursor={{
											show: false
										}}
									>
										{why_part_1}
										<Typist.Backspace
											count={why_part_1.length}
											delay={200}
										/>
										{why_part_2}
										<Typist.Backspace
											count={why_part_2.length}
											delay={200}
										/>
										{why_part_3}
										<Typist.Backspace
											count={why_part_3.length}
											delay={200}
										/>
										{why_part_4}
										<Typist.Backspace
											count={why_part_4.length}
											delay={200}
										/>
										{why_part_5}
									</Typist>
								</h1>
							</Col>
							<Col
								sm={{ span: 0, offset: 0 }}
								md={{ span: 3, offset: 0 }}
								lg={{ span: 6, offset: 0 }}
								xl={{ span: 7, offset: 0 }}
							/>
						</Row>
						<Row type="flex" justify="center">
							<h1
								key="0"
								style={{
									color: colorTheme.text2Color
								}}
							>
								{why_part_6}
							</h1>
						</Row>
						<Row type="flex" justify="center">
							<Typist
								avgTypingDelay={35}
								cursor={{
									show: false
								}}
							>
								<Typist.Delay ms={6000} />
								<h2
									key="1"
									style={{
										color: colorTheme.text4Color,
										padding: '0% 0% 3%'
									}}
								>
									{how}
								</h2>
							</Typist>
						</Row>
					</div>
				);
			default:
				// logged in
				return (
					<div>
						<h1 key="0" style={{ color: colorTheme.text2Color }}>
							{why}
						</h1>
						<h2
							key="1"
							style={{
								color: colorTheme.text5Color
							}}
						>
							{how}
						</h2>
					</div>
				);
		}
	}

	renderLogin() {
		const { colorTheme, auth } = this.props;

		switch (auth) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				return (
					<div>
						<Row type="flex" justify="space-around">
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
									key="-1"
									style={{
										borderColor: colorTheme.key,
										background: colorTheme.key,
										color: colorTheme.text1Color
									}}
								>
									<a href="/auth/google">
										Google Login <Icon type="google" />
									</a>
								</Button>
							</Col>
							<Col
								sm={{ span: 9, offset: 0 }}
								md={{ span: 7, offset: 0 }}
								lg={{ span: 5, offset: 0 }}
								xl={{ span: 4, offset: 0 }}
							>
								<Button
									key="0"
									style={{
										borderColor: colorTheme.keyCompliment1,
										background: colorTheme.keyCompliment1,
										color: colorTheme.text1Color
									}}
								>
									<a href="/auth/linkedIn">
										LinkedIn Login <Icon type="linkedin" />
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
					textAlign: 'center',
					padding: '100px 50px 50px', // top left&right bottom
					minHeight: 82,
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
