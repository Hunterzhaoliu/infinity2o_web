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
    const { colorTheme, profile } = this.props;
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
      <Col>
        <Row type="flex" justify="start" align="middle">
          <Col
            xs={{ span: 8 }}
            sm={{ span: 4 }}
            md={{ span: 3 }}
            lg={{ span: 3 }}
            xl={{ span: 2 }}
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
              Interest(s):
            </h3>
          </Col>
          <Col
            xs={{ offset: 1, span: 11 }}
            sm={{ offset: 1, span: 10 }}
            md={{ offset: 1, span: 13 }}
            lg={{ offset: 1, span: 10 }}
            xl={{ offset: 1, span: 10 }}
          >
            <Select
              mode="multiple"
              value={profile.interests}
              onChange={this.onChangeInterests}
              style={{ width: "100%" }}
            >
              {this.renderOptions()}
            </Select>
          </Col>
        </Row>
        <ErrorMessage
          message="1 to 5 interests pretty please"
          hasError={profile.hasInterestsError}
        />
      </Col>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputInterests);
