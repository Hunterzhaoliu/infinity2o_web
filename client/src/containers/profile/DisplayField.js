import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from "antd";

class DisplayField extends Component {
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  renderValue(label, value) {
    const { infinityStatus } = this.props;

    if (
      label === "Neurons: " ||
      label === "Name: " ||
      label === "Age: " ||
      label === "Time Zone: "
    ) {
      if (label === "Neurons: " && infinityStatus) {
        return "infinity";
      } else if (label === "Neurons: " && !infinityStatus) {
        let displayNeuronsInBillions = value;
        if (displayNeuronsInBillions !== undefined) {
          displayNeuronsInBillions *= 1000000000;
          let finalDisplayString =
            this.numberWithCommas(displayNeuronsInBillions) +
            " (" +
            value +
            " Billion)";

          return finalDisplayString;
        }
      } else if (
        value === null ||
        value === undefined ||
        typeof value === "string" ||
        typeof value === "number"
      ) {
        return value;
      }
    } else if (label === "Availability: ") {
      const daysOfWeek = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ];

      // values = state.profile.availability

      return _.map(daysOfWeek, (day, index) => {
        let timeSlots = "";
        _.map(value.day, (timeSlot, index) => {
          timeSlots += timeSlot;
        });
        console.log("timeSlots = ", timeSlots);
        return (
          <Card style={{ span: 3 }} key={index} title={day}>
            {timeSlots}
          </Card>
        );
      });
      // return (
      //   <div>
      //     <Card title="one">Test</Card>
      //     <Card title="two">Test</Card>
      //     <Card title="three">Test</Card>
      //   </div>
      // );
    } else if (label === "Interest(s): ") {
      let formattedValue = "";
      let i;
      for (i = 0; i < value.length; i++) {
        formattedValue += value[i];
        if (i !== value.length - 1) {
          formattedValue += ", ";
        }
      }
      return formattedValue;
    }
  }

  render() {
    const { colorTheme, label, value } = this.props;
    return (
      <Row type="flex" justify="start" align="middle">
        <Col
          sm={{ span: 5 }}
          md={{ span: 4 }}
          lg={{ span: 3 }}
          xl={{ span: 2 }}
        >
          <h3
            style={{
              color: colorTheme.text6Color
            }}
          >
            {label}
          </h3>
        </Col>
        <Col
          sm={{ span: 18, offset: 1 }}
          md={{ span: 19, offset: 1 }}
          lg={{ span: 20, offset: 1 }}
          xl={{ span: 21, offset: 1 }}
        >
          <h3
            style={{
              color: colorTheme.text3Color
            }}
          >
            {this.renderValue(label, value)}
          </h3>
        </Col>
      </Row>
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
    infinityStatus: state.profile.payment.infinityStatus
  };
}

export default connect(mapStateToProps, null)(DisplayField);
