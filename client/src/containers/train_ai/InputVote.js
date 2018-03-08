import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as trainAIActionCreators from '../../actions/trainAI';
import { bindActionCreators } from 'redux';
import { Button, Card, Col, Layout, Row } from 'antd';
import QandAsList from './QandAsList.js';
const { Content } = Layout;

class InputVote extends Component {
	componentWillMount() {
		// run once before first render()
		// TODO: this.props.fetchUserTrainAIAsks();
	}

	onVote = index => {
		console.log('index = ', index);
		//this.props.onVote();
	};

	renderAnswers(answers) {
		const { colorTheme } = this.props;
		return _.map(answers, (answer, index) => {
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
						{answer}
					</Button>
				</Row>
			);
		});
	}

	renderQandAs() {
		const { colorTheme } = this.props;
		return _.map(QandAsList, (QandAs, key) => {
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
							{QandAs.question}
						</h3>
						{this.renderAnswers(QandAs.answers)}
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
					padding: '15px 0px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row
					style={{
						padding: '15px 0px 0px' // top left&right bottom
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
		colorTheme: state.colorTheme
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
		onVote: answerChosen => {
			trainAIDispatchers.onVote(answerChosen);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVote);
