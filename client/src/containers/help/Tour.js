import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActions from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class Tour extends Component {
	componentWillMount() {
		// run once before first render()

		this.props.onTour();
	}

	render() {
		const { colorTheme, windowWidth } = this.props;
		const WIDTH_RATIO = 0.7;
		const HEIGHT_RATIO = 0.38;
		const videoWidth = windowWidth * WIDTH_RATIO;
		const videoHeight = windowWidth * HEIGHT_RATIO;
		const welcome = `Welcome to Infinity2o`;
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					height: 3000,
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="center">
					<Col span={24}>
						<h1
							key="0"
							style={{
								color: colorTheme.text2Color
							}}
						>
							{welcome}
						</h1>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span={24}>
						<iframe
							title="tour-video"
							width={videoWidth}
							height={videoHeight}
							src="https://www.youtube.com/embed/oQ2fWIce2JU?&autoplay=1"
							allow="autoplay; encrypted-media"
							frameBorder="0"
							allowFullScreen
						/>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<h2
							key="0"
							style={{
								padding: '20px 0px 0px',
								color: colorTheme.text2Color
							}}
						>
							WHY: We believe the future of education can become
							better by following these principles:
						</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							1) People have different interests at different
							times so we should cater the education to each
							person's interests and ability.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							2) Teach to the problem instead of the tools. This
							way the relevance of the tools become obvious.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							3) People enjoy learning with others that believe in
							the same core beliefs.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							4) Learn how to create your own job instead of
							taking tests to get into a college (AKA nightclub &
							job insurance).
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<h2
							key="0"
							style={{
								padding: '20px 0px 0px',
								color: colorTheme.text2Color
							}}
						>
							HOW: Master Plan V1
						</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							1) Get 100 users that love us. A user that loves us
							will have their profile filled out and be willing to
							pay to meet someone else in our community.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							2) Recommend online courses (that teach to a
							problem) for our students to take together to
							generate affiliate marketing revenue.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							3) Open our first Infinity2o center in Philadelphia,
							PA where any Infinity2o students can come to work on
							their online course with their partner for $X/month.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							4) Our Infinity2o centers will have paid teaching
							assistants for the difficult online courses.
						</p>
						<p
							style={{
								color: colorTheme.text3Color
							}}
						>
							5) If the Philadelphia location is profitable we
							will continue to open Infinity2o centers in our
							communities most popular cities.
						</p>
					</Col>
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
		windowWidth: state.customHeader.windowWidth
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
		onTour: () => {
			customHeaderDispatchers.onTour();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
