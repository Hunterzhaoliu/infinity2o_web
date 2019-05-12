import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as sortingHatActionCreators from "../../actions/sorting_hat/sortingHat";
import * as landingActionCreators from "../../actions/landing";
import { bindActionCreators } from "redux";
import {
  GREY_8,
  GREY_7,
  GREY_1,
  GREY_DOT_5,
  RED_ORANGE_3
} from "../styles/ColorConstants";
import FirstVote from "../landing/FirstVote";
import { Card, Col, Layout, Row, Icon } from "antd";
import "./input-vote.css";

const { Content } = Layout;

class InputVote extends Component {
  onVote(answerIndex, askIndex, askId) {
    const { sortingHat, history, mongoDBUserId } = this.props;
    // now we know which answer user pressed so let's pass the answesId too
    const ask = sortingHat.current4DisplayedAsks[askIndex];
    const answerId = ask.answers[answerIndex]._id;

    const isRevote = askIndex === sortingHat.recentVotedAskIndex;
    if (!isRevote && sortingHat.recentVotedAskIndex !== null) {
      this.props.onNextAsk(
        sortingHat.nextAsks,
        sortingHat.recentVotedAskIndex,
        mongoDBUserId
      );
    }
    this.props.onVote(
      answerIndex,
      answerId,
      askIndex,
      askId,
      history,
      mongoDBUserId
    );
  }

  renderNextAskButton(askIndex, isDisplayingAskStats) {
    const { colorTheme, activeSection, sortingHat, mongoDBUserId } = this.props;

    let buttonText = "Pass";
    if (isDisplayingAskStats) {
      buttonText = "Next Question";
    }

    if (activeSection !== "sorting_hat") {
      return;
    } else {
      return (
        <Row style={{ padding: "10px 0px 0px" }}>
          <button
            className="input-vote-button"
            style={{
              borderColor: colorTheme.backgroundColor,
              background: colorTheme.backgroundColor,
              color: colorTheme.text2Color
            }}
            onClick={e =>
              this.props.onNextAsk(sortingHat.nextAsks, askIndex, mongoDBUserId)
            }
          >
            {buttonText}
          </button>
        </Row>
      );
    }
  }

  renderAnswerButton(
    displayAnswerButtonColor,
    answerButtonTextColor,
    answerIndex,
    askIndex,
    askId,
    displayAnswer,
    sortingHat,
    isDisplayingSaveIcon
  ) {
    const { activeSection } = this.props;

    if (activeSection !== "sorting_hat") {
      return (
        <button
          className="input-vote-button"
          style={{
            borderColor: displayAnswerButtonColor,
            background: displayAnswerButtonColor,
            color: answerButtonTextColor
          }}
          onClick={e => this.onVoteLanding(answerIndex, askIndex)}
        >
          {displayAnswer}
        </button>
      );
    } else {
      return (
        <button
          className="input-vote-button"
          style={{
            borderColor: displayAnswerButtonColor,
            background: displayAnswerButtonColor,
            color: answerButtonTextColor
          }}
          onClick={e => this.onVote(answerIndex, askIndex, askId)}
        >
          {displayAnswer}
          {this.renderSaveIcon(sortingHat.save, askIndex, isDisplayingSaveIcon)}
        </button>
      );
    }
  }

  onVoteLanding(answerIndex, askIndex) {
    const { landing } = this.props;
    let isFirstVote = false;

    if (landing.numberOfLandingVotes === 0) {
      isFirstVote = true;
    }

    this.props.onVoteLanding(answerIndex, askIndex, isFirstVote);
  }

  renderSpanChange(isDisplayingAskStats) {
    const { windowWidth } = this.props;
    if (isDisplayingAskStats) {
      if (windowWidth > 768) {
        return 16;
      } else {
        return 17;
      }
    }
  }

  renderAskStats(answerVotes, askTotalVotes, isDisplayingAskStats) {
    if (isDisplayingAskStats) {
      const askStat =
        String(((answerVotes / askTotalVotes) * 100).toFixed(1)) + "%";

      return (
        <p
          style={{
            marginBottom: 0,
            lineHeight: 1,
            fontFamily: "Overpass",
            fontSize: "16px"
          }}
        >
          {askStat}
        </p>
      );
    }
  }

  renderAnswers(
    answers,
    askIndex,
    ask,
    askId,
    isDisplayingAskStats,
    askTotalVotes
  ) {
    const { colorTheme, sortingHat, landing, activeSection } = this.props;
    let answerButtonColor = colorTheme.backgroundColor;
    let answerButtonTextColor = colorTheme.text2Color;
    let votedAnswerButtonColor = colorTheme.keyText8Color;
    let votingPlace = sortingHat;
    if (activeSection !== "sorting_hat") {
      answerButtonColor = GREY_1;
      answerButtonTextColor = GREY_8;
      votedAnswerButtonColor = RED_ORANGE_3;
      votingPlace = landing;
    }

    return _.map(answers, (answerObject, answerIndex) => {
      // displaying actual answers
      let displayAnswer;
      if (answerObject !== null) {
        displayAnswer = answerObject.answer;
      }

      // displaying the change in voted answer button color
      const currentAnswerId = ask.answers[answerIndex]._id;

      let displayAnswerButtonColor = answerButtonColor;
      let isDisplayingSaveIcon = false;
      let answerVotes = answerObject.votes;

      // if user has voted on an ask
      if (votingPlace.votes[askId] !== undefined) {
        const votedAnswerId = votingPlace.votes[askId].answerId;
        isDisplayingAskStats = true;
        if (votedAnswerId === currentAnswerId) {
          displayAnswerButtonColor = votedAnswerButtonColor;
          isDisplayingSaveIcon = true;
        }
      }

      return (
        <Row
          style={{ padding: "10px 0px 0px" }}
          key={answerIndex}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={this.renderSpanChange(isDisplayingAskStats)}>
            {this.renderAnswerButton(
              displayAnswerButtonColor,
              answerButtonTextColor,
              answerIndex,
              askIndex,
              askId,
              displayAnswer,
              votingPlace,
              isDisplayingSaveIcon
            )}
          </Col>
          <Col
            xs={{ offset: 1 }}
            sm={{ offset: 1 }}
            md={{ offset: 1 }}
            lg={{ offset: 1 }}
            xl={{ offset: 1 }}
          >
            {this.renderAskStats(
              answerVotes,
              askTotalVotes,
              isDisplayingAskStats
            )}
          </Col>
        </Row>
      );
    });
  }

  renderQandAs() {
    const {
      colorTheme,
      sortingHat,
      landing,
      activeSection,
      windowWidth
    } = this.props;

    let fourAsks;
    let cardColor = colorTheme.textDot5Color;
    let cardTextColor = colorTheme.text2Color;
    let voteColor = colorTheme.text3Color;
    if (activeSection !== "sorting_hat") {
      fourAsks = landing.landingAsks;
      cardColor = GREY_DOT_5;
      cardTextColor = GREY_8;
      voteColor = GREY_7;
    } else {
      fourAsks = sortingHat.current4DisplayedAsks;
    }

    if (fourAsks.length > 0) {
      return _.map(fourAsks, (Ask, askIndex) => {
        let displayQuestion;
        let displayAnswers;

        let askId;
        let askTotalVotes;
        let isDisplayingAskStats = false;
        let totalVotesDisplay;

        if (Ask !== null && Ask !== undefined) {
          displayQuestion = Ask.question;
          displayAnswers = Ask.answers;
          askId = Ask._id;
          askTotalVotes = Ask.totalVotes;
          if (
            sortingHat.votes[askId] !== undefined ||
            landing.votes[askId] !== undefined
          ) {
            // user has voted on this question
            isDisplayingAskStats = true;
            // need to display the total number of votes on ask
            totalVotesDisplay = String(askTotalVotes) + " vote(s)";
          }

          let h3FontSize = "22px";
          let h5FontSize = "18px";
          if (windowWidth < 768) {
            h3FontSize = "18px";
            h5FontSize = "16px";
          }

          return (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              key={askIndex}
            >
              <Card
                style={{
                  borderColor: cardColor,
                  background: cardColor,
                  color: cardTextColor,
                  textAlign: "center"
                }}
                bodyStyle={{
                  padding: "30px"
                }} // padding around inside border of card
              >
                <h3
                  style={{
                    color: cardTextColor,
                    fontFamily: "Overpass",
                    marginBottom: 0,
                    lineHeight: 1,
                    padding: "0px 0px 10px 0px",
                    fontSize: h3FontSize
                  }}
                >
                  {displayQuestion}
                </h3>
                <h5
                  style={{
                    color: voteColor,
                    lineHeight: 1,
                    fontFamily: "Overpass",
                    marginBottom: 0,
                    fontSize: h5FontSize
                  }}
                >
                  {totalVotesDisplay}
                </h5>
                {this.renderAnswers(
                  displayAnswers,
                  askIndex,
                  Ask,
                  askId,
                  isDisplayingAskStats,
                  askTotalVotes
                )}
                {this.renderNextAskButton(askIndex, isDisplayingAskStats)}
              </Card>
              <Row
                style={{
                  padding: "0px 0px 30px"
                }}
              />
            </Col>
          );
        }
      });
    } else {
      return (
        <h3
          style={{
            color: colorTheme.text2Color,
            fontFamily: "Overpass",
            marginBottom: 0,
            lineHeight: 1,
            fontSize: 28,
            padding: "90px 0px 0px",
            textAlign: "center"
          }}
        >
          Looks like you've done a lot of voting. Try asking a question!
        </h3>
      );
    }
  }

  renderSaveIcon(saveState, saveIndex, isDisplaying) {
    if (isDisplaying) {
      if (saveState[saveIndex] === "save_start") {
        return <Icon type="loading" />;
      } else if (saveState[saveIndex] === "save_done") {
        return <Icon type="check" />;
      } else if (saveState[saveIndex] === "save_error") {
        return <Icon type="warning" />;
      }
    }
  }

  render() {
    const { colorTheme, activeSection, windowWidth } = this.props;

    let background = colorTheme.backgroundColor;
    if (activeSection !== "sorting_hat") {
      background = GREY_1;
    }

    let gutter = 30;
    if (windowWidth < 768) {
      gutter = 0;
    }

    return (
      <Content
        style={{
          background: background
        }}
      >
        <FirstVote />
        <Row type="flex" justify="center" gutter={gutter}>
          {this.renderQandAs()}
        </Row>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme,
    sortingHat: state.sortingHat,
    mongoDBUserId: state.auth.mongoDBUserId,
    windowWidth: state.customHeader.windowWidth,
    landing: state.landing,
    activeSection: state.colorTheme.activeSection
  };
}

function mapDispatchToProps(dispatch) {
  const sortingHatDispatchers = bindActionCreators(
    sortingHatActionCreators,
    dispatch
  );

  const landingDispatchers = bindActionCreators(
    landingActionCreators,
    dispatch
  );

  return {
    onNextAsk: (nextAsks, removeAskIndex, mongoDBUserId) => {
      sortingHatDispatchers.onNextAsk(nextAsks, removeAskIndex, mongoDBUserId);
    },
    onVote: (
      answerIndex,
      answerId,
      askIndex,
      askId,
      history,
      mongoDBUserId
    ) => {
      sortingHatDispatchers.onVote(
        answerIndex,
        answerId,
        askIndex,
        askId,
        history,
        mongoDBUserId
      );
    },
    onVoteLanding: (answerIndex, askIndex, isFirstVote) => {
      landingDispatchers.onVoteLanding(answerIndex, askIndex, isFirstVote);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputVote);
