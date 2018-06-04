import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class MatchesButton extends Component {
  renderMatchesButton() {
    const { colorTheme, onMatches } = this.props;

    return (
      <Button
        style={{
          borderColor: colorTheme.matchesButtonColor,
          background: colorTheme.matchesButtonColor,
          color: colorTheme.matchesButtonTextColor
        }}
        onClick={onMatches}
      >
        <a href="/matches">
          <img
            alt=""
            style={{ width: 32, padding: "0px 0px 1px" }}
            src="https://user-images.githubusercontent.com/24757872/40881562-23db47c0-668f-11e8-84a6-29020f352353.png"
          />Matches
        </a>
      </Button>
    );
  }

  render() {
    return (
      <Col
        style={{ padding: "1px 0px 0px" }}
        md={{ offset: 1 }}
        lg={{ offset: 1 }}
        xl={{ offset: 1 }}
        key="4"
      >
        {this.renderMatchesButton()}
      </Col>
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
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );
  return {
    onMatches: () => {
      colorThemeDispatchers.onMatches();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesButton);
