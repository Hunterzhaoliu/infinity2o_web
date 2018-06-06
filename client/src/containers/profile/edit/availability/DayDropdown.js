import _ from "lodash";
import React, { Component } from "react";
import * as profileActionCreators from "../../../../actions/profile/profile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Dropdown, Icon, Menu, Checkbox } from "antd";
import "./DayDropdown.css";

const timeSlotOptions = [
  "6-8 AM",
  "8-10 AM",
  "10-12 AM",
  "12-2 PM",
  "2-4 PM",
  "4-6 PM",
  "6-8 PM",
  "8-10 PM",
  "10-12 PM"
];

class DayDropdown extends Component {
  state = {
    visible: false
  };

  renderMenuItems(day) {
    const { colorTheme, profile } = this.props;
    const newTimeSlots = profile.newAvailability[day.value];

    document.documentElement.style.setProperty(
      `--text2Color`,
      colorTheme.text2Color
    );
    document.documentElement.style.setProperty(
      `--text3Color`,
      colorTheme.text3Color
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
      `--text7Color`,
      colorTheme.text7Color
    );

    return _.map(timeSlotOptions, timeSlot => {
      return (
        <Menu.Item
          style={{
            borderColor: colorTheme.text7Color,
            background: colorTheme.text7Color
          }}
          key={day.value + " " + timeSlot}
        >
          <Checkbox
            style={{
              borderColor: colorTheme.text7Color,
              background: colorTheme.text7Color,
              color: colorTheme.text2Color
            }}
            checked={this.isChecked(timeSlot, newTimeSlots)}
            value={[day.value, timeSlot]}
            onChange={this.onChangeTimeSlot}
          >
            {timeSlot}
          </Checkbox>
        </Menu.Item>
      );
    });
  }

  isChecked(timeSlot, newTimeSlots) {
    if (newTimeSlots !== undefined && newTimeSlots.includes(timeSlot)) {
      return true;
    }
  }

  onChangeTimeSlot = e => {
    this.props.onChangeTimeSlot(e.target.value);
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    // day comes from InputSchedule and is just a specific day in a week
    const { colorTheme, day } = this.props;

    // copy over initial old checked time slots
    const menu = <Menu>{this.renderMenuItems(day)}</Menu>;
    return (
      <div>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={24}>
            <Dropdown
              onVisibleChange={this.handleVisibleChange}
              visible={this.state.visible}
              overlay={menu}
            >
              <a
                style={{
                  color: colorTheme.text2Color
                }}
              >
                {day.label} <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
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
    colorTheme: state.colorTheme,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  const profileDispatchers = bindActionCreators(
    profileActionCreators,
    dispatch
  );

  return {
    onChangeTimeSlot: newTimeSlots => {
      profileDispatchers.onChangeTimeSlot(newTimeSlots);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DayDropdown);
