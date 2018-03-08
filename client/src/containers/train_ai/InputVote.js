import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as trainAIActionCreators from '../../actions/trainAI';
import { bindActionCreators } from 'redux';
import { Button, Card, Col, Layout, Row } from 'antd';
const { Content } = Layout;

class InputVote extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.fetchUserTrainAIAsks();
	}

	onVote = index => {
		console.log('index = ', index);
		//this.props.onVote();
	};

	renderAnswers(answers) {
		const { colorTheme } = this.props;
		return _.map(answers, (answerObject, index) => {
			let displayAnswer;
			if (answerObject !== null) {
				displayAnswer = answerObject.answer;
			}
			return (
				<Row style={{ padding: '8px 0px 0px' }} key={index}>
					<Button
						style={{
							borderColor: colorTheme.text7Color,
							background: colorTheme.text7Color,
							color: colorTheme.text2Color
						}}
						onClick={this.onVote}
					>
						{displayAnswer}
					</Button>
				</Row>
			);
		});
	}

	renderQandAs() {
		const { colorTheme, trainAI } = this.props;
		return _.map(trainAI.current4DisplayedAsks, (Ask, key) => {
			let displayQuestion;
			if (Ask !== null) {
				displayQuestion = Ask.question;
			}
			let displayAnswers;
			if (Ask !== null) {
				displayAnswers = Ask.answers;
			}

			return (
				<Col span={12} key={key}>
					<Card
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: colorTheme.text2Color
						}}
					>
						<h3
							style={{
								color: colorTheme.text2Color
							}}
						>
							{displayQuestion}
						</h3>
						{this.renderAnswers(displayAnswers)}
						<Row style={{ padding: '8px 0px 0px' }}>
							<Button
								style={{
									borderColor: colorTheme.text7Color,
									background: colorTheme.text7Color,
									color: colorTheme.text2Color
								}}
								onClick={this.onPass}
							>
								Pass
							</Button>
						</Row>
					</Card>
					<Row
						style={{
							padding: '36px 0px 0px' // top left&right bottom
						}}
					/>
				</Col>
			);
		});
	}

	render() {
		const { colorTheme } = this.props;
		//console.log('this.props in InputVote.js', this.props);
		return (
			<Content
				style={{
					overflow: 'initial',
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					style={{
						padding: '5px 0px 0px' // top left&right bottom
					}}
					gutter={36}
				>
					{this.renderQandAs()}
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
		trainAI: state.trainAI
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const trainAIDispatchers = bindActionCreators(
		trainAIActionCreators,
		dispatch
	);

	return {
		fetchUserTrainAIAsks: () => {
			trainAIDispatchers.fetchUserTrainAIAsks();
		},
		onVote: e => {
			trainAIDispatchers.onVote(e);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
