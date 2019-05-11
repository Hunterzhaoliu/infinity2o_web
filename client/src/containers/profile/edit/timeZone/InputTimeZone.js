import React, { Component } from "react";
import * as profileActionCreators from "../../../../actions/profile/profile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col, Cascader } from "antd";
import timeZones from "./timeZones";
import ErrorMessage from "../ErrorMessage";
import "./InputTimeZone.css";

class InputTimeZone extends Component {
  onChangeTimeZone = e => {
    this.props.onChangeTimeZone(e);
  };

  render() {
    const { colorTheme, profile } = this.props;
    document.documentElement.style.setProperty(
      `--text2Color`,
      colorTheme.text2Color
    );
    document.documentElement.style.setProperty(
      `--text4Color`,
      colorTheme.text4Color
    );
    document.documentElement.style.setProperty(
      `--text6Color`,
      colorTheme.text6Color
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
              Time Zone:
            </h3>
          </Col>
          <Col
            xs={{ offset: 1, span: 11 }}
            sm={{ offset: 1, span: 10 }}
            md={{ offset: 1, span: 10 }}
            lg={{ offset: 1, span: 8 }}
            xl={{ offset: 1, span: 6 }}
          >
            <Cascader
              className="input-time-zone-cascader"
              style={{
                background: colorTheme.text8Color
              }}
              value={profile.timeZone}
              onChange={this.onChangeTimeZone}
              options={timeZones}
              expandTrigger="hover"
              allowClear={false}
              placeholder=""
            />
          </Col>
        </Row>
        <ErrorMessage
          message="Need a time zone instead of a country"
          hasError={profile.hasTimeZoneError}
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
    onChangeTimeZone: newTimeZone => {
      profileDispatchers.onChangeTimeZone(newTimeZone);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputTimeZone);
