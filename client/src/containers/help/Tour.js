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
		const { colorTheme } = this.props;
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
						<h2
							key="0"
							style={{
								color: colorTheme.text2Color
							}}
						>
							{welcome}
						</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span={24}>
						<iframe
							title="tour-video"
							width="840"
							height="472.5"
							src="https://www.youtube.com/embed/_bCDOyo4ZOo?&autoplay=1"
							allow="autoplay; encrypted-media"
							frameBorder="0"
							allowFullScreen
						/>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col >
					<h2
						key="0"
						style={{
							padding: '20px 0px 0px',
							color: colorTheme.text2Color
						}}
					>
						Master Plan v1
					</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col >
					<p
						style={{
							color: colorTheme.text3Color
						}}
					>
						1) Get 100 users that love us.
					</p>
					<p
						style={{
							color: colorTheme.text3Color
						}}
					>
						2) Recommend online courses for our students to take together to generate affiliate marketing revenue.
					</p>
					<p
						style={{
							color: colorTheme.text3Color
						}}
					>
						3) Open our first location in Philadelphia, PA where any Infinity2o students
						   can come to work on their online course with their partner for $X/month.
					</p>
					<p
						style={{
							color: colorTheme.text3Color
						}}
					>
						4) If the Philadelphia location is profitable we will continue to open
						   Infinity2o centers in our communities most popular cities.
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
		colorTheme: state.colorTheme
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
