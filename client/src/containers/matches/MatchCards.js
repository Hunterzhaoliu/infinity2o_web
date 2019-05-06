import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, message } from "antd";
import * as matchesActionCreators from "../../actions/matches/matches";
import * as profileActionCreators from "../../actions/profile/profile";
import { bindActionCreators } from "redux";
import LinkedIn from "../profileInformation/LinkedIn";
import Github from "../profileInformation/Github";
import Interests from "../profileInformation/Interests";
import TimeZone from "../profileInformation/TimeZone";
import {
  NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS,
  NUMBER_NEURONS_TO_SAY_HI
} from "../payment/prices";
import "./match-cards.css";
import dolphin from "../images/dolphin.jpg";

class MatchCards extends Component {
  onNextMatch() {
    const { nextMatches, basicMatchInfo, mongoDBUserId } = this.props;
    if (nextMatches.length > 0) {
      this.props.onNextMatch(basicMatchInfo[1], mongoDBUserId);
    } else {
      this.props.onNextMatch(null, null);
    }
  }

  renderMatchAge(matchAge, colorThemeText6Color) {
    if (matchAge !== undefined && matchAge !== null) {
      return (
        <Col>
          <h4
            style={{
              color: colorThemeText6Color,
              fontFamily: "Overpass",
              lineHeight: 1,
              marginBottom: 0,
              fontSize: 26
            }}
          >
            {", "}
            {matchAge}
          </h4>
        </Col>
      );
    }
  }

  displayNeedToGetMoreNeurons = () => {
    message.config({
      top: 90
    });
    message.warn(
      "You need " +
        NUMBER_NEURONS_TO_SAY_HI +
        " neurons to 'Say Hi'. Get neurons by voting or asking questions in Sorting Hat.",
      5
    );
  };

  onStartConversation(history, matchName, matchId) {
    const { neuronsInBillions, mongoDBUserId } = this.props;
    if (neuronsInBillions >= NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS) {
      this.props.decrementNeurons(
        NUMBER_NEURONS_TO_SAY_HI_IN_BILLIONS,
        mongoDBUserId
      );
      this.props.onStartConversation(history, matchName, matchId);
    } else {
      this.displayNeedToGetMoreNeurons();
    }
  }

  renderMatchTotalVotes(totalUserVotes) {
    const { colorTheme } = this.props;

    let voteDescription;
    if (totalUserVotes <= 1) {
      voteDescription = " vote";
    } else {
      voteDescription = " votes";
    }
    return (
      <Row
        style={{ padding: "15px 0px 0px 0px" }}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col>
          <h4
            style={{
              color: colorTheme.text4Color,
              fontFamily: "Overpass",
              lineHeight: 1,
              marginBottom: 0,
              fontSize: 20
            }}
          >
            {totalUserVotes} {voteDescription}
          </h4>
        </Col>
      </Row>
    );
  }

  renderMatchPicture(imageUrl, backgroundColor) {
    if (imageUrl === undefined || imageUrl === null) {
      imageUrl = dolphin;
    }

    return (
      <Row type="flex" justify="center" align="middle">
        <div
          style={{
            width: "100%",
            height: "130px",
            backgroundColor: backgroundColor
          }}
        />
        <img
          className="match-cards-img"
          alt=""
          onError={error => {
            // in case the imageUrl is invalid
            error.target.onerror = null;
            error.target.src = dolphin;
          }}
          src={imageUrl}
        />
      </Row>
    );
  }

  renderMatchButtons() {
    const { colorTheme, match, history, activeSection } = this.props;
    if (activeSection === "matches") {
      // about page uses the same code for Hunter and Q profiles
      // don't need to display match buttons on about page
      return (
        <Row
          style={{ padding: "30px 0px 0px 0px" }}
          type="flex"
          justify="center"
        >
          <Col>
            <button
              className="match-cards-button"
              style={{
                borderColor: colorTheme.backgroundColor,
                background: colorTheme.backgroundColor,
                color: colorTheme.text2Color
              }}
              onClick={e => this.onNextMatch()}
            >
              Next
            </button>
          </Col>
          <Col xl={{ offset: 4 }}>
            <button
              className="match-cards-button"
              style={{
                borderColor: colorTheme.keyText6Color,
                background: colorTheme.keyText6Color,
                color: colorTheme.text1Color
              }}
              onClick={e =>
                this.onStartConversation(history, match.name, match.id)
              }
            >
              Say Hi
            </button>
          </Col>
        </Row>
      );
    }
  }

  render() {
    const { match, colorTheme } = this.props;
    return (
      <Card
        bordered="false"
        loading={false}
        style={{
          color: colorTheme.text1Color,
          borderColor: colorTheme.text9Dot5Color,
          background: colorTheme.text9Dot5Color
        }}
        bodyStyle={{ padding: "0px 0px 60px 0px" }} // padding around inside border of card
      >
        {this.renderMatchPicture(match.imageUrl, colorTheme.keyText7Color)}
        <Row
          style={{ padding: "90px 0px 0px 0px" }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col>
            <h4
              style={{
                color: colorTheme.keyText7Color,
                fontFamily: "Overpass",
                lineHeight: 1,
                marginBottom: 0,
                fontSize: 26
              }}
            >
              {match.name}
            </h4>
          </Col>
          {this.renderMatchAge(match.age, colorTheme.text6Color)}
          <LinkedIn value={match.linkedInPublicProfileUrl} />
          <Github value={match.githubPublicProfileUrl} />
        </Row>

        {this.renderMatchTotalVotes(match.totalUserVotes)}
        <Row
          style={{ padding: "0px 0px 0px 20px" }}
          type="flex"
          justify="start"
          align="middle"
        >
          <Col>
            <Interests interests={match.interests} />
            <TimeZone value={match.timeZone} />
          </Col>
        </Row>
        {this.renderMatchButtons()}
      </Card>
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
    neuronsInBillions: state.profile.payment.neuronsInBillions,
    mongoDBUserId: state.auth.mongoDBUserId,
    nextMatches: state.matches.nextMatches,
    basicMatchInfo: state.matches.basicMatchInfo,
    activeSection: state.colorTheme.activeSection
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const matchesDispatchers = bindActionCreators(
    matchesActionCreators,
    dispatch
  );

  const profileDispatchers = bindActionCreators(
    profileActionCreators,
    dispatch
  );

  return {
    onStartConversation: (history, matchName, matchId) => {
      matchesDispatchers.onStartConversation(history, matchName, matchId);
    },
    onNextMatch: (matchNeededToBeChecked, mongoDBUserId) => {
      matchesDispatchers.onNextMatch(matchNeededToBeChecked, mongoDBUserId);
    },
    decrementNeurons: (neuronsInBillions, mongoDBUserId) => {
      profileDispatchers.decrementNeurons(neuronsInBillions, mongoDBUserId);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchCards);
