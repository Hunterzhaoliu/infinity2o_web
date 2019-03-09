import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as askActionCreators from "../../actions/sorting_hat/ask";
import { bindActionCreators } from "redux";
import { Row, Col, Button, Icon, Modal } from "antd";
import ErrorMessage from "./ErrorMessage";
import "./ask.css";

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

	renderAnswerCharacterCount(answerLength) {
		if (answerLength > 0) {
			return (
				<Col
					sm={{ offset: 1 }}
					md={{ offset: 1 }}
					lg={{ offset: 1 }}
					xl={{ offset: 1 }}
				>
					<h6>{25 - answerLength}</h6>
				</Col>
			);
		}
	}

	renderAnswerInputs(newAnswers) {
		const { ask } = this.props;

		return _.map(newAnswers, (answer, key) => {
			return (
				<div key={key}>
					<Row
						type="flex"
						justify="start"
						align="middle"
						style={{
							padding: "20px 0px 0px" // top left&right bottom
						}}
					>
						<Col
							sm={{ offset: 4 }}
							md={{ offset: 4 }}
							lg={{ offset: 4 }}
							xl={{ offset: 4, span: 2 }}
						>
							<img
								alt=""
								style={{
									width: "28px",
									padding: "0px 0px 0px 0px" // top right bottom left
								}}
								src="https://user-images.githubusercontent.com/24757872/40994715-96be843e-68c2-11e8-8df8-1cb8e2dc7d07.png"
							/>
						</Col>
						<Col xl={{ span: 13 }}>
							<input
								name={key}
								onChange={this.onChangeAnswer}
								placeholder={"Answer " + (key + 1).toString()}
								style={{ fontSize: "20px" }}
							/>
						</Col>
						{this.renderAnswerCharacterCount(
							ask.newAnswers[key].length
						)}
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
			displayRemoveAnswerButtonOffset = 4;
		}
		if (ask.displayRemoveAnswerButton) {
			return (
				<Col
					sm={{ offset: displayRemoveAnswerButtonOffset }}
					md={{ offset: displayRemoveAnswerButtonOffset }}
					lg={{ offset: displayRemoveAnswerButtonOffset }}
					xl={{ offset: displayRemoveAnswerButtonOffset }}
				>
					<Button
						style={{
							borderColor: colorTheme.keyText7Color,
							background: colorTheme.keyText7Color,
							color: colorTheme.text2Color,
							fontSize: "16px"
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
				<Col xl={{ offset: 4 }}>
					<Button
						style={{
							borderColor: colorTheme.keyText7Color,
							background: colorTheme.keyText7Color,
							color: colorTheme.text2Color,
							fontSize: "16px"
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

	renderQuestionCharacterCount(questionLength) {
		if (questionLength > 0) {
			return (
				<Col
					sm={{ offset: 1 }}
					md={{ offset: 1 }}
					lg={{ offset: 1 }}
					xl={{ offset: 1 }}
				>
					<h6>{50 - questionLength}</h6>
				</Col>
			);
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
		let modalWidth = windowWidth / 1.618;

		document.documentElement.style.setProperty(
			`--text4Color`,
			colorTheme.text4Color
		);
		document.documentElement.style.setProperty(
			`--text5Color`,
			colorTheme.text5Color
		);
		document.documentElement.style.setProperty(
			`--text6Color`,
			colorTheme.text6Color
		);
		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);

		return (
			<Modal
				visible={ask.isAskModalOpen}
				onCancel={e => this.props.closeAskModal()}
				footer={null}
				centered={true}
				bodyStyle={{
					padding: "60px 20px"
				}}
				style={{ padding: "60px 0px 0px 0px" }} // where the modal is
				width={modalWidth}
			>
				<Row type="flex" justify="left" align="middle">
					<Col xl={{ offset: 4, span: 15 }}>
						<input
							onChange={this.onChangeQuestion}
							placeHolder="Question"
							style={{ fontSize: "26px" }}
						/>
					</Col>
					{this.renderQuestionCharacterCount(ask.questionLength)}
				</Row>
				<ErrorMessage
					message="Between 8 to 50 characters"
					hasError={ask.hasQuestionError}
				/>
				<Row style={{ padding: "10px 0px 0px" }} />
				{this.renderAnswerInputs(ask.newAnswers)}
				<Row
					type="flex"
					justify="start"
					style={{
						padding: "30px 0px 0px"
					}}
				>
					{this.renderAddAnswerButton()}
					{this.renderRemoveAnswerButton()}
				</Row>
				<Row
					type="flex"
					justify="start"
					style={{
						padding: "30px 0px 0px"
					}}
				>
					<Col xl={{ offset: 4, span: 15 }}>
						<Button
							style={{
								borderColor: colorTheme.key,
								background: colorTheme.key,
								color: colorTheme.text1Color,
								fontSize: "16px"
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
