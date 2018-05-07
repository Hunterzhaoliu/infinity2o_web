import React, { Component } from "react";
import * as profileActionCreators from "../../../../actions/profile";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Cascader, Row, Col } from "antd";
import timeZones from "./timeZones";
import ErrorMessage from "../ErrorMessage";
import "./InputTimeZone.css";

class InputTimeZone extends Component {
  onChangeTimeZone = e => {
    this.props.onChangeTimeZone(e);
  };

  render() {
    const { colorTheme, label, width, profile } = this.props;
    document.documentElement.style.setProperty(
      `--time-zone-color`,
      colorTheme.text8Color
    );
    document.documentElement.style.setProperty(
      `--time-zone-highlight-color`,
      colorTheme.text6Color
    );
    document.documentElement.style.setProperty(
      `--time-zone-text-color`,
      colorTheme.text1Color
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
                color: colorTheme.text6Color
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
            <Cascader
              style={{
                width: width,
                background: colorTheme.text8Color
              }}
              value={profile.newTimeZone}
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
    onChangeTimeZone: newTimeZone => {
      profileDispatchers.onChangeTimeZone(newTimeZone);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputTimeZone);
