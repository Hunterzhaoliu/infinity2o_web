import _ from "lodash";
import React, { Component } from "react";
import * as profileActionCreators from "../../../../actions/profile/profile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import optionFields from "./optionFields";
import ErrorMessage from "../ErrorMessage";
// import "../ProfileEdit.css";
import "./InputInterests.css";

import { Row, Col, Select } from "antd";
const { Option } = Select;

class InputInterests extends Component {
  renderOptions() {
    const { colorTheme } = this.props;

    return _.map(optionFields, option => {
      return (
        <Option
          style={{
            background: colorTheme.text8Color,
            color: colorTheme.text4Color
          }}
          value={option.value}
          key={option.value}
        >
          {option.name}
        </Option>
      );
    });
  }

  onChangeInterests = e => {
    this.props.onChangeInterests(e);
  };

  render() {
    const { colorTheme, label, width, profile } = this.props;
    document.documentElement.style.setProperty(
      `--text2Color`,
      colorTheme.text2Color
    );
    document.documentElement.style.setProperty(
      `--text3Color`,
      colorTheme.text3Color
    );
    document.documentElement.style.setProperty(
      `--text7Color`,
      colorTheme.text7Color
    );
    document.documentElement.style.setProperty(
      `--text8Color`,
      colorTheme.text8Color
    );

    return (
      <div>
        <Row type="flex" justify="start" align="middle">
          <Col
            sm={{ span: 6 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 4 }}
          >
            <h3
              style={{
                color: colorTheme.text4Color
              }}
            >
              {label}
            </h3>
          </Col>
          <Col
            sm={{ span: 16, offset: 1 }}
            md={{ span: 17, offset: 1 }}
            lg={{ span: 17, offset: 1 }}
            xl={{ span: 19, offset: 1 }}
          >
            <Select
              mode="multiple"
              style={{
                width: width
              }}
              value={profile.newInterests}
              onChange={this.onChangeInterests}
            >
              {this.renderOptions()}
            </Select>
          </Col>
        </Row>
        <ErrorMessage
          message="1 to 5 interests pretty please"
          hasError={profile.hasInterestsError}
        />
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
    onChangeInterests: newInterests => {
      profileDispatchers.onChangeInterests(newInterests);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputInterests);
