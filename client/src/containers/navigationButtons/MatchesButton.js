import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class MatchesButton extends Component {
  renderMatchesButton() {
    const { colorTheme } = this.props;

    return (
      <Button
        style={{
          borderColor: colorTheme.matchesButtonColor,
          background: colorTheme.matchesButtonColor,
          color: colorTheme.matchesButtonTextColor
        }}
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

export default connect(mapStateToProps, null)(MatchesButton);
