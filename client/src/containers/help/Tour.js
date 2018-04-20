import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActions from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

const stepValues = [
	{
		instructions: 'Step 1: Start by editing your profile',
		src:
			'https://user-images.githubusercontent.com/2585159/38623287-e696bb8a-3d6a-11e8-826a-914ff9b6b210.png'
	},
	{
		instructions:
			'Step 2: Vote on questions to train your artificial intelligence',
		src:
			'https://user-images.githubusercontent.com/2585159/38622587-1cc4050c-3d69-11e8-9953-2945887cd73c.png'
	},
	{
		instructions:
			"Step 3: Every day you get 2 matches you can 'Say Hi' too",
		src:
			'https://user-images.githubusercontent.com/2585159/38624600-144881fa-3d6e-11e8-8fc3-203c925d04c4.png'
	},
	{
		instructions:
			'Step 4: Start chatting about online classes you want to take',
		src:
			'https://user-images.githubusercontent.com/2585159/38625186-823b5876-3d6f-11e8-89c3-17ed4c7b65e8.png'
	},
	{
		instructions:
			'Step 5: Ask questions that matter to you to find better matches',
		src:
			'https://user-images.githubusercontent.com/2585159/38617158-e0d0db72-3d5b-11e8-8c2c-e5040d2dfe51.png'
	}
];

class Tour extends Component {
	componentWillMount() {
		// run once before first render()

		this.props.onTour();
	}

	renderSteps() {
		const { colorTheme } = this.props;
		return _.map(stepValues, (stepValue, index) => {
			return (
				<div key={index}>
					<Row
						type="flex"
						justify="center"
						align="middle"
						style={{
							padding: '2% 0% 0%' // top left&right bottom
						}}
					>
						<Col span={24}>
							<h2
								style={{
									color: colorTheme.text2Color
								}}
							>
								{stepValue.instructions}
							</h2>
						</Col>
					</Row>
					<img style={{ height: 400 }} src={stepValue.src} alt="" />
				</div>
			);
		});
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
				{this.renderSteps()}
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
