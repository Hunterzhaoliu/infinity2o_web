import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as indexActionCreators from '../../actions/index';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Button } from 'antd';
import InputVote from './InputVote';
const { Content } = Layout;

class TrainAI extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserProfile();
		this.props.onTrainAI();
	}

	render() {
		//console.log('this.props in TrainAI.js', this.props);
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					padding: '75px 50px 50px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						textAlign: 'center',
						padding: '0% 0% 5px' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<h2
							style={{
								color: colorTheme.text2Color
							}}
						>
							We believe people are great partners because their
							core beliefs align.
						</h2>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="center"
					align="middle"
					style={{
						padding: '0% 0% 5px' // top left&right bottom
					}}
				>
					<Col md={{ span: 16 }}>
						<h3
							style={{
								color: colorTheme.text3Color
							}}
						>
							Find partners by asking questions that matter to
							you:
						</h3>
					</Col>
					<Col md={{ span: 4, offset: 0 }}>
						<Button
							key="1"
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
						>
							<a href="/train_ai/ask">Ask Question</a>
						</Button>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						padding: '50px 0px 0px' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<h3
							style={{
								textAlign: 'center',
								color: colorTheme.text3Color
							}}
						>
							Or vote on questions that matter to you:
						</h3>
					</Col>
				</Row>
				<Row
					type="flex"
					justify="start"
					align="middle"
					style={{
						textAlign: 'center',
						padding: '0px 0% 0%' // top left&right bottom
					}}
				>
					<Col md={{ span: 24 }}>
						<InputVote />
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
	const indexDispatchers = bindActionCreators(indexActionCreators, dispatch);

	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		fetchUserProfile: () => {
			indexDispatchers.fetchUserProfile();
		},
		onTrainAI: () => {
			colorThemeDispatchers.onTrainAI();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainAI);
