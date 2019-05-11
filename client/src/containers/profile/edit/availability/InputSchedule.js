import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import DayDropdown from "./DayDropdown";
import { Row, Col } from "antd";
import daysOfWeek from "./daysOfWeek";

class InputSchedule extends Component {
  renderDaysOfWeekDropdowns() {
    return _.map(daysOfWeek, day => {
      return (
        <Col
          xs={{ span: 6 }}
          sm={{ span: 2 }}
          md={{ span: 2 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
          key={day.label}
        >
          <DayDropdown day={day} />
        </Col>
      );
    });
  }

  render() {
    const { colorTheme } = this.props;

    return (
      <Col
        xs={{ span: 20 }}
        sm={{ span: 24 }}
        md={{ span: 24 }}
        lg={{ span: 24 }}
        xl={{ span: 24 }}
      >
        <Row type="flex" justify="start" align="middle">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 15 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
          >
            <h3
              style={{
                color: colorTheme.text4Color,
                fontFamily: "Overpass",
                lineHeight: 1,
                marginBottom: 0,
                fontSize: "18px"
              }}
            >
              When am I free to video chat for class?
            </h3>
          </Col>
        </Row>
        <Row
          style={{
            padding: "15px 0px 0px 0px"
          }}
          type="flex"
          justify="start"
          align="middle"
        >
          {this.renderDaysOfWeekDropdowns()}
        </Row>
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

export default connect(
  mapStateToProps,
  null
)(InputSchedule);
