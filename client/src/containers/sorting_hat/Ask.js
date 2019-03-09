import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as askActionCreators from "../../actions/sorting_hat/ask";
import { bindActionCreators } from "redux";
import { Layout, Row, Col, Button, Input, Icon, Modal } from "antd";
import ErrorMessage from "./ErrorMessage";
import "./ask.css";

const { Content } = Layout;

class Ask extends Component {
	componentWillMount() {
		// run once before first render()
		// keeps the custom Header button colors
		this.props.onSortingHat();
	}

	onChangeQuestion = e => {
		this.props.onChangeQuestion(e.target.value);
	};

	onChangeAnswer = e => {
		const { ask } = this.props;
		this.props.onChangeAnswer(
			e.target.value,
			e.target.name,
			ask.newAnswers
		);
	};

	renderAnswerInputs(newAnswers) {
		const { colorTheme, ask, windowWidth } = this.props;
		// let answerInputWidth = windowWidth * 0.183; // = 220/1200
		let answerInputWidth = windowWidth * 0.32; // = 220/1200

		return _.map(newAnswers, (answer, key) => {
			return (
				<div key={key}>
					<Row
						type="flex"
						justify="center"
						align="middle"
						style={{
							padding: "25px 0px 0px" // top left&right bottom
						}}
					>
						<Col>
							<img
								alt=""
								style={{
									width: "32px",
									padding: "0px 0px 0px 0px" // top right bottom left
								}}
								src="https://user-images.githubusercontent.com/24757872/40994715-96be843e-68c2-11e8-8df8-1cb8e2dc7d07.png"
							/>
						</Col>
						<Col
							sm={{ offset: 1 }}
							md={{ offset: 1 }}
							lg={{ offset: 1 }}
							xl={{ offset: 1 }}
						>
							<Input
								name={key}
								onChange={this.onChangeAnswer}
								style={{
									width: answerInputWidth,
									borderColor: colorTheme.text7Color,
									background: colorTheme.text7Color,
									color: colorTheme.text3Color
								}}
								placeholder={"Answer " + (key + 1).toString()}
							/>
						</Col>
						<Col
							sm={{ offset: 1 }}
							md={{ offset: 1 }}
							lg={{ offset: 1 }}
							xl={{ offset: 1 }}
						>
							<h5
								style={{
									color: colorTheme.text4Color
								}}
							>
								{25 - ask.newAnswers[key].length}
							</h5>
						</Col>
					</Row>
					<ErrorMessage
						message="Between 1 & 25 characters"
						hasError={ask.hasAnswersError[key]}
					/>
					<ErrorMessage
						message="No duplicate answers pretty please"
						hasError={ask.hasDuplicateAnswerError}
					/>
				</div>
			);
		});
	}

	isAskDisabled(ask) {
		if (
			ask.newQuestion === null ||
			ask.hasQuestionError ||
			ask.newAnswers[0].length === 0 ||
			ask.newAnswers[1].length === 0 ||
			ask.hasAnswersError[0] ||
			ask.hasAnswersError[1] ||
			ask.hasAnswersError[2] ||
			ask.hasAnswersError[3]
		) {
			return true;
		} else {
			return false;
		}
	}

	renderAskIcon(saveState) {
		if (saveState === "save_start") {
			return <Icon type="loading" />;
		} else if (saveState === "save_done") {
			return <Icon type="check" />;
		} else if (saveState === "save_error") {
			return <Icon type="warning" />;
		}
	}

	renderRemoveAnswerButton() {
		const { onClickRemoveAnswer, ask, colorTheme } = this.props;
		let displayRemoveAnswerButtonOffset;
		if (ask.displayAddAnswerButton) {
			displayRemoveAnswerButtonOffset = 1;
		} else {
			displayRemoveAnswerButtonOffset = 0;
		}
		if (ask.displayRemoveAnswerButton) {
			return (
				<Col
					sm={{ offset: displayRemoveAnswerButtonOffset }}
					md={{ offset: displayRemoveAnswerButtonOffset }}
					lg={{ offset: displayRemoveAnswerButtonOffset }}
					xl={{ offset: displayRemoveAnswerButtonOffset }}
					style={{ padding: "0px 0px 0px 2px" }}
				>
					<Button
						style={{
							borderColor: colorTheme.keyText7Color,
							background: colorTheme.keyText7Color,
							color: colorTheme.text2Color
						}}
						onClick={onClickRemoveAnswer}
					>
						Remove Answer
					</Button>
				</Col>
			);
		} else {
			return;
		}
	}

	renderAddAnswerButton() {
		const { onClickAddAnswer, ask, colorTheme } = this.props;
		if (ask.displayAddAnswerButton) {
			return (
				<Col style={{ padding: "0px 0px 0px 5px" }}>
					<Button
						style={{
							borderColor: colorTheme.keyText7Color,
							background: colorTheme.keyText7Color,
							color: colorTheme.text2Color
						}}
						onClick={onClickAddAnswer}
					>
						Add Answer
					</Button>
				</Col>
			);
		} else {
			return;
		}
	}

	render() {
		const {
			colorTheme,
			saveAsk,
			ask,
			windowWidth,
			mongoDBUserId
		} = this.props;
		let answerInputWidth = windowWidth * 0.183; // = 220/1200
		let questionInputWidth = answerInputWidth * 2;

		document.documentElement.style.setProperty(
			`--text5Color`,
			colorTheme.text5Color
		);

		return (
			<Modal
				visible={true}
				onCancel={e => this.props.closeAskModal()}
				footer={null}
				centered={true}
				bodyStyle={{
					padding: "60px 10px",
					backgroundColor: colorTheme.textColor1
				}}
				style={{ padding: "40px 0px 0px 0px" }} // where the modal is
			>
				<Row
					type="flex"
					justify="center"
					align="middle"
					style={{
						padding: "0px 0px 0px" // top left&right bottom
					}}
				>
					<Col>
						<Input
							onChange={this.onChangeQuestion}
							style={{
								width: questionInputWidth,
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text3Color
							}}
							placeholder="Question"
						/>
					</Col>
					<Col
						sm={{ offset: 1 }}
						md={{ offset: 1 }}
						lg={{ offset: 1 }}
						xl={{ offset: 1 }}
					>
						<h5
							style={{
								color: colorTheme.text4Color
							}}
						>
							{50 - ask.questionLength}
						</h5>
					</Col>
				</Row>
				<ErrorMessage
					message="Between 8 to 50 characters"
					hasError={ask.hasQuestionError}
				/>
				{this.renderAnswerInputs(ask.newAnswers)}
				<Row
					type="flex"
					justify="start"
					style={{
						padding: "25px 0px 0px" // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 3 }}
					/>
					{this.renderAddAnswerButton()}
					{this.renderRemoveAnswerButton()}
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: "25px 0px 0px" // top left&right bottom
					}}
				>
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 3 }}
					/>
					<Col style={{ padding: "0px 0px 0px 5px" }}>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color
							}}
							disabled={this.isAskDisabled(ask)}
							onClick={() => saveAsk(ask, mongoDBUserId)}
						>
							Ask
							{this.renderAskIcon(ask.save)}
						</Button>
					</Col>
				</Row>
			</Modal>
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
		ask: state.ask,
		windowWidth: state.customHeader.windowWidth,
		mongoDBUserId: state.auth.mongoDBUserId
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	const askDispatchers = bindActionCreators(askActionCreators, dispatch);

	return {
		onSortingHat: () => {
			colorThemeDispatchers.onSortingHat();
		},
		closeAskModal: () => {
			askDispatchers.closeAskModal();
		},
		onChangeQuestion: newQuestion => {
			askDispatchers.onChangeQuestion(newQuestion);
		},
		onClickAddAnswer: () => {
			askDispatchers.onClickAddAnswer();
		},
		onClickRemoveAnswer: () => {
			askDispatchers.onClickRemoveAnswer();
		},
		onChangeAnswer: (newAnswer, answerIndex, previousAnswers) => {
			askDispatchers.onChangeAnswer(
				newAnswer,
				answerIndex,
				previousAnswers
			);
		},
		saveAsk: (ask, mongoDBUserId) => {
			askDispatchers.saveAsk(ask, mongoDBUserId);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Ask);
