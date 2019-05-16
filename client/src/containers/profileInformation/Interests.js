import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import interestIcon from "../images/interestIcon.png";

class Interests extends Component {
  renderInterests() {
    const { interests } = this.props;
    // interests = profile.interests
    let formattedInterests = "";
    let upperCaseInterest = "";
    for (let i = 0; i < interests.length; i++) {
      upperCaseInterest =
        interests[i][0].toUpperCase() + interests[i].substring(1);
      // replaces underscore in two word interests with space
      upperCaseInterest = upperCaseInterest.replace(/_/g, " ");
      const spaceIndex = upperCaseInterest.indexOf(" ");
      if (spaceIndex !== -1) {
        const secondWordFirstLetterIndex = spaceIndex + 1;
        upperCaseInterest =
          upperCaseInterest.substr(0, secondWordFirstLetterIndex) +
          upperCaseInterest[secondWordFirstLetterIndex].toUpperCase() +
          upperCaseInterest.substr(secondWordFirstLetterIndex + 1);
      }

      formattedInterests += upperCaseInterest;
      // adds comma between interests
      if (interests.length === 2 && i === 0) {
        formattedInterests += " & ";
      } else if (i !== interests.length - 1) {
        formattedInterests += ", ";
        if (i === interests.length - 2) {
          formattedInterests += "& ";
        }
      }
    }
    return formattedInterests;
  }

  render() {
    const { interests, textColor } = this.props;
    if (interests !== null && interests.length > 0) {
      return (
        <Row
          style={{ padding: "15px 0px 0px 0px" }}
          type="flex"
          justify="start"
          align="middle"
        >
          <Col span={1}>
            <img
              alt="Interests: "
              style={{
                width: "25px"
              }}
              src={interestIcon}
            />
          </Col>
          <Col
            span={23}
            style={{
              padding: "0px 20px 0px 20px",
              fontFamily: "Overpass",
              lineHeight: 1.2,
              fontSize: 16,
              color: textColor
            }}
          >
            {this.renderInterests()}
          </Col>
        </Row>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  null,
  null
)(Interests);
