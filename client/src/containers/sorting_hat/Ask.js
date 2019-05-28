import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import * as askActionCreators from "../../actions/sorting_hat/ask";
import { bindActionCreators } from "redux";
import { Row, Col, Icon, Modal } from "antd";
import ErrorMessage from "./ErrorMessage";
import "./Ask.css";
import answerBox from "../images/answerBox.png";

class Ask extends Component {
  componentDidMount() {
    // run once before first render()
    // keeps the custom Header button colors
    this.props.onSortingHat();
  }

  onChangeQuestion = e => {
    this.props.onChangeQuestion(e.target.value);
  };

  onChangeAnswer = e => {
    const { ask } = this.props;
    this.props.onChangeAnswer(e.target.value, e.target.name, ask.newAnswers);
  };

  renderAnswerCharacterCount(answerLength, h6FontSize) {
    if (answerLength > 0) {
      return (
        <Col
          xs={{ offset: 1 }}
          sm={{ offset: 1 }}
          md={{ offset: 1 }}
          lg={{ offset: 1 }}
          xl={{ offset: 1 }}
        >
          <h6 style={{ fontSize: h6FontSize }}>{25 - answerLength}</h6>
        </Col>
      );
    }
  }

  renderAnswerInputs(newAnswers) {
    const { ask, windowWidth } = this.props;

    let inputAnswerFontSize = "20px";
    let h6FontSize = "18px";
    let answerBoxWidth = "33px";
    if (windowWidth < 768) {
      answerBoxWidth = "25px";
      inputAnswerFontSize = "16px";
      h6FontSize = "14px";
    }

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
              xs={{ offset: 0, span: 3 }}
              sm={{ offset: 0, span: 2 }}
              md={{ offset: 0, span: 2 }}
              lg={{ offset: 0, span: 2 }}
              xl={{ offset: 3, span: 1 }}
            >
              <img
                alt=""
                style={{
                  width: answerBoxWidth,
                  padding: "0px 0px 0px 0px" // top right bottom left
                }}
                src={answerBox}
              />
            </Col>
            <Col
              xs={{ offset: 1, span: 17 }}
              sm={{ offset: 1, span: 18 }}
              md={{ offset: 1, span: 18 }}
              lg={{ offset: 1, span: 18 }}
              xl={{ offset: 1, span: 8 }}
            >
              <input
                name={key}
                className="ask-input"
                onChange={this.onChangeAnswer}
                placeholder={"Answer " + (key + 1).toString()}
                style={{ fontSize: inputAnswerFontSize }}
                value={answer}
              />
            </Col>
            {this.renderAnswerCharacterCount(
              ask.newAnswers[key].length,
              h6FontSize
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
      // want remove answer button to display to the right of add answer button
      displayRemoveAnswerButtonOffset = 0;
    } else {
      displayRemoveAnswerButtonOffset = 3;
    }
    if (ask.displayRemoveAnswerButton) {
      return (
        <Col
          xs={{ offset: displayRemoveAnswerButtonOffset }}
          sm={{ offset: displayRemoveAnswerButtonOffset }}
          md={{ offset: displayRemoveAnswerButtonOffset }}
          lg={{ offset: displayRemoveAnswerButtonOffset }}
          xl={{ offset: displayRemoveAnswerButtonOffset }}
        >
          <button
            className="ask-button"
            style={{
              borderColor: colorTheme.keyText7Color,
              background: colorTheme.keyText7Color,
              color: colorTheme.text2Color
            }}
            onClick={onClickRemoveAnswer}
          >
            Remove Answer
          </button>
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
        <Col
          xs={{ offset: 0 }}
          sm={{ offset: 0 }}
          md={{ offset: 0 }}
          lg={{ offset: 0 }}
          xl={{ offset: 3 }}
        >
          <button
            className="ask-button"
            style={{
              borderColor: colorTheme.keyText6Color,
              background: colorTheme.keyText6Color,
              color: colorTheme.text2Color
            }}
            onClick={onClickAddAnswer}
          >
            Add Answer
          </button>
        </Col>
      );
    } else {
      return;
    }
  }

  renderQuestionCharacterCount(questionLength, h6FontSize) {
    if (questionLength > 0) {
      return (
        <Col
          xs={{ offset: 1 }}
          sm={{ offset: 1 }}
          md={{ offset: 1 }}
          lg={{ offset: 1 }}
          xl={{ offset: 1 }}
        >
          <h6 style={{ fontSize: h6FontSize }}>{50 - questionLength}</h6>
        </Col>
      );
    }
  }

  render() {
    const { colorTheme, saveAsk, ask, windowWidth, mongoDBUserId } = this.props;

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
    const modalWidth = windowWidth / 1.618;
    let modalInnerPadding = "60px";
    let inputQuestionFontSize = "26px";
    let h6FontSize = "18px";
    if (windowWidth < 768) {
      modalInnerPadding = "30px";
      inputQuestionFontSize = "20px";
      h6FontSize = "14px";
    }
    return (
      <Modal
        visible={ask.isAskModalOpen}
        onCancel={e => this.props.closeAskModal()}
        footer={null}
        centered={true}
        bodyStyle={{
          padding: modalInnerPadding,
          backgroundColor: colorTheme.text8Color
        }}
        style={{
          padding: "60px 0px 0px 0px" // where the modal is
        }}
        width={modalWidth} // only works until windowWidth < 768px
      >
        <Row type="flex" justify="left" align="middle">
          <Col
            xs={{ offset: 0, span: 21 }}
            sm={{ offset: 0, span: 21 }}
            md={{ offset: 0, span: 21 }}
            lg={{ offset: 0, span: 21 }}
            xl={{ offset: 3, span: 17 }}
          >
            <input
              value={ask.newQuestion}
              className="ask-input"
              onChange={this.onChangeQuestion}
              placeholder="Question"
              style={{ fontSize: inputQuestionFontSize }}
            />
          </Col>
          {this.renderQuestionCharacterCount(ask.questionLength, h6FontSize)}
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
          <Col xl={{ offset: 3 }}>
            <button
              className="ask-button"
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
            </button>
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
      askDispatchers.onChangeAnswer(newAnswer, answerIndex, previousAnswers);
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
