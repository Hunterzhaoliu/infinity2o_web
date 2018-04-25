import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "antd";
import "./DisplayField.css";

class DisplayField extends Component {
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  renderValue(label, value) {
    const { colorTheme, infinityStatus } = this.props;
    // document.documentElement.style.setProperty(
    //   `--table-border-color`,
    //   colorTheme.text2Color
    // );
    // document.documentElement.style.setProperty(
    //   `--table-color`,
    //   colorTheme.text4Color
    // );
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
      if (value !== {}) {
        const daysOfWeek = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday"
        ];

        let columnHeaders = [
          { title: "Mon", dataIndex: "monday", align: "center" },
          { title: "Tues", dataIndex: "tuesday", align: "center" },
          { title: "Wed", dataIndex: "wednesday", align: "center" },
          { title: "Thurs", dataIndex: "thursday", align: "center" },
          { title: "Fri", dataIndex: "friday", align: "center" },
          { title: "Sat", dataIndex: "saturday", align: "center" },
          { title: "Sun", dataIndex: "sunday", align: "center" }
        ];

        const indexInTimeSlot = {
          "6-8 AM": 0,
          "8-10 AM": 1,
          "10-12 noon": 2,
          "12-2 PM": 3,
          "2-4 PM": 4,
          "4-6 PM": 5,
          "6-8 PM": 6,
          "8-10 PM": 7,
          "10-12 midnight": 8
        };

        let timeSlots = [
          { key: 0 },
          { key: 1 },
          { key: 2 },
          { key: 3 },
          { key: 4 },
          { key: 5 },
          { key: 6 },
          { key: 7 },
          { key: 8 }
        ];

        // tells what index to splice from columnHeaders
        let i = 0;

        // fills in timeSlots (all of the data)
        daysOfWeek.forEach(day => {
          if (value[day] !== undefined) {
            if (value[day].length > 0) {
              value[day].forEach(timeSlot => {
                const indexInTimeSlots = indexInTimeSlot[timeSlot];
                timeSlots[indexInTimeSlots][day] = timeSlot;
              });
              i++;
            } else {
              columnHeaders.splice(i, 1);
            }

            //deletes all of the unnecessary rows
            if (day === "sunday") {
              for (i = 0; i < timeSlots.length; ) {
                const row = timeSlots[i];
                if (Object.keys(row).length > 1) {
                  i++;
                } else {
                  timeSlots.splice(i, 1);
                }
              }
            }
          }
        });

        return (
          <Table
            style={{
              backgroundColor: colorTheme.text7Color
            }}
            dataSource={timeSlots}
            columns={columnHeaders}
            bordered
            pagination={false}
            size="medium"
          />
        );
      } else {
        return;
      }
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
