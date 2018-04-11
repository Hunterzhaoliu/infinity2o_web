import _ from 'lodash';
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

	renderSteps() {
		const { colorTheme } = this.props;
		const stepValues = [
			{
				instructions: 'Start by editing your profile',
				src:
					'https://user-images.githubusercontent.com/24757872/38593521-5a2f113c-3d07-11e8-85dd-3a0acd7bce29.png'
			},
			{
				instructions: 'Save your profile',
				src:
					'https://user-images.githubusercontent.com/24757872/38592192-3e8a8a30-3d00-11e8-9de9-7707bbc9b022.png'
			},
			{
				instructions: 'Answer Questions to Train your AI',
				src:
					'https://user-images.githubusercontent.com/24757872/38593334-7a0e9974-3d06-11e8-8155-0876a2ad196e.png'
			},
			{
				instructions: 'Find your partner',
				src:
					'https://user-images.githubusercontent.com/24757872/38592192-3e8a8a30-3d00-11e8-9de9-7707bbc9b022.png'
			}
		];
		return _.map(stepValues, (stepValue, index) => {
			return (
				<div key={index}>
					<Row
						type="flex"
						justify="center"
						align="middle"
						style={{
							padding: '1% 0% 0%' // top left&right bottom
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
					<Row
						type="flex"
						justify="center"
						align="middle"
						style={{
							padding: '0% 0% 0%' // top left&right bottom
						}}
					>
						<Col span={24}>
							<img src={stepValue.src} alt="" />
						</Col>
					</Row>
				</div>
			);
		});
	}

	render() {
		const { colorTheme } = this.props;
		const welcome = `How do I use infinity2o?`;
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 50px', // top left&right bottom
					minHeight: 82,
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="center">
					<Col
						sm={{ span: 13, offset: 0 }}
						md={{ span: 10, offset: 0 }}
						lg={{ span: 7, offset: 0 }}
						xl={{ span: 24, offset: 0 }}
					>
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
