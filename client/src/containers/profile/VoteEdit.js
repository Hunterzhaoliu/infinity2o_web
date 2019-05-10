import _ from "lodash";
import React, { Component } from "react";
import * as voteEditActionCreators from "../../actions/profile/voteEdit";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./vote-edit.css";

import { Row, Col, Icon, Modal } from "antd";

class VoteEdit extends Component {
  onPressPage(displayPage) {
    this.props.onPressPage(displayPage);
  }

  renderFetchIcon(index) {
    const { voteEdit } = this.props;
    if (voteEdit.fetchState[index] === "start") {
      return <Icon type="loading" />;
    } else if (voteEdit.fetchState[index] === "done") {
      return <Icon type="check" />;
    } else if (voteEdit.fetchState[index] === "error") {
      return <Icon type="warning" />;
    }
  }

  onPressAsk(mongoDBAskId, index, mongoDBAnswerId) {
    this.props.onPressAsk(mongoDBAskId, index, mongoDBAnswerId);
  }

  roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  }

  renderPagination() {
    const { colorTheme, profile, voteEdit } = this.props;

    let numberOfItems = 0;
    if (profile.asks != null) {
      numberOfItems = profile.asks.votes.length;
    }
    const numberOfPageButtons = this.roundUp(numberOfItems / 8, 0);
    return _.map(new Array(numberOfPageButtons), (pageButton, index) => {
      let textColor = colorTheme.text5Color;
      const displayPage = index + 1;
      if (voteEdit.page === displayPage) {
        textColor = colorTheme.text2Color;
      }
      return (
        <Col
          key={index}
          style={{
            padding: "0px 5px 0px 0px"
          }}
        >
          <button
            className="vote-edit-button"
            style={{
              borderColor: colorTheme.text8Color,
              background: colorTheme.text8Color,
              color: textColor,
              width: "40px"
            }}
            onClick={e => this.onPressPage(displayPage)}
          >
            {displayPage}
          </button>
        </Col>
      );
    });
  }

  renderVotes() {
    const { colorTheme, profile, voteEdit } = this.props;

    const PER_PAGE = 8;
    if (profile.asks != null) {
      let i = 0;
      let f = PER_PAGE;
      if (voteEdit.page !== 1) {
        i = (voteEdit.page - 1) * PER_PAGE;
        f = voteEdit.page * PER_PAGE;
      }

      const newestVotes = profile.asks.votes.slice(i, f);
      return _.map(newestVotes, (vote, index) => {
        return (
          <Row key={index} type="flex" justify="start" align="middle">
            <Col
              style={{
                padding: "0px 0px 10px"
              }}
            >
              <button
                className="vote-edit-button"
                style={{
                  borderColor: colorTheme.text8Color,
                  background: colorTheme.text8Color,
                  color: colorTheme.text3Color
                }}
                onClick={e =>
                  this.onPressAsk(vote._askId, index, vote._answerId)
                }
              >
                <p
                  style={{
                    marginBottom: 0
                  }}
                >
                  {vote.question} {this.renderFetchIcon(index)}
                </p>
              </button>
            </Col>
          </Row>
        );
      });
    }
  }

  renderRevoteStats(answerObject) {
    const { colorTheme, voteEdit } = this.props;
    if (voteEdit.askToRevote.totalRevotes === 0) {
      return (
        <div>
          <div
            style={{
              color: colorTheme.keyText4Color,
              fontFamily: "Overpass",
              fontSize: "16px",
              lineHeight: 1,
              marginBottom: 0
            }}
          >
            {"0.0%"}
          </div>
          <div
            style={{
              color: colorTheme.keyText4Color,
              fontFamily: "Overpass",
              fontSize: "16px",
              lineHeight: 1,
              marginBottom: 0
            }}
          >
            {"0.0%"}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            style={{
              color: colorTheme.keyText3Color,
              fontFamily: "Overpass",
              fontSize: "16px",
              lineHeight: 1,
              marginBottom: 0
            }}
          >
            {String(
              (
                (answerObject.votesIn / voteEdit.askToRevote.totalRevotes) *
                100
              ).toFixed(1)
            ) + "%"}
          </div>
          <div
            style={{
              color: colorTheme.keyText5Color,
              fontFamily: "Overpass",
              fontSize: "16px",
              lineHeight: 1,
              marginBottom: 0
            }}
          >
            {String(
              (
                (answerObject.votesOut / voteEdit.askToRevote.totalRevotes) *
                100
              ).toFixed(1)
            ) + "%"}
          </div>
        </div>
      );
    }
  }

  renderSaveIcon(saveState, saveIndex) {
    if (saveState[saveIndex] === "start") {
      return <Icon type="loading" />;
    } else if (saveState[saveIndex] === "done") {
      return <Icon type="check" />;
    } else if (saveState[saveIndex] === "error") {
      return <Icon type="warning" />;
    }
  }

  renderAnswers(answers) {
    const { colorTheme, voteEdit, mongoDBUserId } = this.props;
    return _.map(answers, (answerObject, answerIndex) => {
      // displaying actual answers
      let displayAnswer;
      if (answerObject !== null) {
        displayAnswer = answerObject.answer;
      }

      // displaying the change in voted answer button color
      const currentAnswerId = answers[answerIndex]._id;

      let displayAnswerButtonColor = colorTheme.text7Color;

      if (
        voteEdit.currentMongoDBAnswerId !== null &&
        voteEdit.currentMongoDBAnswerId === currentAnswerId
      ) {
        displayAnswerButtonColor = colorTheme.keyText7Color;
      } else if (
        voteEdit.currentMongoDBAnswerId === null &&
        voteEdit.previousMongoDBAnswerId === currentAnswerId
      ) {
        displayAnswerButtonColor = colorTheme.keyText7Color;
      }

      return (
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ padding: "10px 0px 0px" }}
          key={answerIndex}
        >
          <Col
            xl={{ span: 12 }}
            style={{
              textAlign: "center"
            }}
          >
            <button
              className="vote-edit-button"
              style={{
                borderColor: displayAnswerButtonColor,
                background: displayAnswerButtonColor,
                color: colorTheme.text3Color
              }}
              onClick={e =>
                this.props.onRevote(
                  voteEdit.askToRevote._id,
                  currentAnswerId,
                  voteEdit.previousMongoDBAnswerId,
                  answerIndex,
                  displayAnswer,
                  voteEdit.currentMongoDBAnswerId,
                  mongoDBUserId
                )
              }
            >
              {displayAnswer}
              {this.renderSaveIcon(voteEdit.revoteSaveState, answerIndex)}
            </button>
          </Col>
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
            style={{
              textAlign: "center"
            }}
          >
            <div
              style={{
                color: colorTheme.text3Color,
                fontFamily: "Overpass",
                lineHeight: 1,
                marginBottom: 0,
                fontSize: 16
              }}
            >
              {String(
                (
                  (answerObject.votes / voteEdit.askToRevote.totalVotes) *
                  100
                ).toFixed(1)
              ) + "%"}
            </div>
          </Col>
          <Col
            xs={{ span: 6 }}
            sm={{ span: 6 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
            style={{
              textAlign: "center"
            }}
          >
            {this.renderRevoteStats(answerObject)}
          </Col>
        </Row>
      );
    });
  }

  renderVoteCount() {
    const { colorTheme, voteEdit, windowWidth } = this.props;

    let voteWord = " vote ";
    if (
      voteEdit.askToRevote.totalVotes === 0 ||
      voteEdit.askToRevote.totalVotes > 1
    ) {
      voteWord = " votes ";
    }

    let revoteWord = " revote ";
    if (
      voteEdit.askToRevote.totalRevotes === 0 ||
      voteEdit.askToRevote.totalRevotes > 1
    ) {
      revoteWord = " revotes ";
    }

    let h5FontSize = 20;
    if (windowWidth < 768) {
      h5FontSize = 16;
    }

    return (
      <h5
        style={{
          textAlign: "center",
          color: colorTheme.text3Color,
          fontFamily: "Overpass",
          lineHeight: 1,
          marginBottom: 0,
          fontSize: h5FontSize
        }}
      >
        {voteEdit.askToRevote.totalVotes +
          voteWord +
          " & " +
          voteEdit.askToRevote.totalRevotes +
          revoteWord}
      </h5>
    );
  }

  renderAskToRevote() {
    const { colorTheme, voteEdit, windowWidth } = this.props;

    if (voteEdit.askToRevote !== null) {
      let h3FontSize = 24;
      let modalPaddingLocation = "90px 0px 0px 0px";
      let modalInnerPadding = "60px";
      let h4FontSize = 20;
      let modalWidth = "50%";
      if (windowWidth < 768) {
        h3FontSize = 22;
        modalPaddingLocation = "0px 0px 0px 0px";
        modalInnerPadding = "30px 15px";
        h4FontSize = 17;
        modalWidth = "50%";
      }

      document.documentElement.style.setProperty(`--modalWidth`, modalWidth);

      return (
        <Modal
          className="vote-edit-modal"
          visible={voteEdit.isRevoteModalOpen}
          onCancel={e => this.props.closeRevoteModal()}
          footer={null}
          centered={true}
          bodyStyle={{
            padding: modalInnerPadding,
            backgroundColor: colorTheme.backgroundColor
          }}
          style={{ padding: modalPaddingLocation }} // where the modal is
        >
          <Row type="flex" justify="center">
            <h3
              style={{
                textAlign: "center",
                color: colorTheme.text2Color,
                fontFamily: "Overpass",
                lineHeight: 1,
                marginBottom: 0,
                fontSize: h3FontSize
              }}
            >
              {voteEdit.askToRevote.question}
            </h3>
          </Row>
          <Row style={{ padding: "30px 0px 0px" }} type="flex" justify="center">
            {this.renderVoteCount()}
          </Row>
          <Row
            style={{ padding: "15px 0px 0px 0px" }}
            type="flex"
            justify="center"
            align="middle"
          >
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
            >
              <h4
                style={{
                  color: colorTheme.text4Color,
                  textAlign: "center",
                  fontFamily: "Overpass",
                  lineHeight: 1,
                  marginBottom: 0,
                  fontSize: h4FontSize
                }}
              >
                Answer
              </h4>
            </Col>
            <Col
              xs={{ span: 6 }}
              sm={{ span: 6 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
            >
              <h4
                style={{
                  textAlign: "center",
                  color: colorTheme.text4Color,
                  fontFamily: "Overpass",
                  lineHeight: 1,
                  marginBottom: 0,
                  fontSize: h4FontSize
                }}
              >
                Vote %
              </h4>
            </Col>
            <Col
              xs={{ span: 6 }}
              sm={{ span: 6 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 4 }}
            >
              <h4
                style={{
                  textAlign: "center",
                  color: colorTheme.keyText3Color,
                  fontFamily: "Overpass",
                  lineHeight: 1,
                  marginBottom: 0,
                  fontSize: h4FontSize
                }}
              >
                Revote In %
              </h4>
              <h4
                style={{
                  textAlign: "center",
                  color: colorTheme.keyText5Color,
                  fontFamily: "Overpass",
                  lineHeight: 1,
                  marginBottom: 0,
                  fontSize: h4FontSize
                }}
              >
                Revote Out %
              </h4>
            </Col>
          </Row>
          {this.renderAnswers(voteEdit.askToRevote.answers)}
        </Modal>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="start" align="top">
          <Col>{this.renderVotes()}</Col>
        </Row>
        {this.renderAskToRevote()}
        <Row
          style={{
            padding: "10px 0px 0px"
          }}
          type="flex"
          justify="start"
          align="middle"
        >
          {this.renderPagination()}
        </Row>
      </div>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    windowWidth: state.customHeader.windowWidth,
    colorTheme: state.colorTheme,
    profile: state.profile,
    voteEdit: state.voteEdit,
    mongoDBUserId: state.auth.mongoDBUserId
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const voteEditDispatchers = bindActionCreators(
    voteEditActionCreators,
    dispatch
  );

  return {
    onPressPage: newPage => {
      voteEditDispatchers.onPressPage(newPage);
    },
    onPressAsk: (mongoDBAskId, index, mongoDBAnswerId) => {
      voteEditDispatchers.onPressAsk(mongoDBAskId, index, mongoDBAnswerId);
    },
    onRevote: (
      mongoDBAskId,
      mongoDBAnswerId,
      previousMongoDBAnswerId,
      answerIndex,
      newAnswer,
      currentMongoDBAnswerId,
      mongoDBUserId
    ) => {
      voteEditDispatchers.onRevote(
        mongoDBAskId,
        mongoDBAnswerId,
        previousMongoDBAnswerId,
        answerIndex,
        newAnswer,
        currentMongoDBAnswerId,
        mongoDBUserId
      );
    },
    closeRevoteModal: () => {
      voteEditDispatchers.closeRevoteModal();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteEdit);
