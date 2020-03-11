import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import ErrorMessage from "./ErrorMessage";
import "./input-field.css";

class InputField extends Component {
  onModify = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { value, colorTheme, label, errorMessage, hasError } = this.props;

    let finalValue = value;
    // input cannot have value as `null` or `undefined`, need to change to empty string
    if (finalValue === null || finalValue === undefined) {
      finalValue = "";
    }

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
            <h4
              style={{
                color: colorTheme.text4Color,
                fontFamily: "Overpass",
                lineHeight: 1,
                marginBottom: 0,
                fontSize: "18px"
              }}
            >
              {label}
            </h4>
          </Col>
          <Col
            xs={{ offset: 1, span: 11 }}
            sm={{ offset: 1, span: 10 }}
            md={{ offset: 1, span: 13 }}
            lg={{ offset: 1, span: 10 }}
            xl={{ offset: 1, span: 10 }}
          >
            <input
              className="input-field-input"
              value={finalValue}
              onChange={this.onModify}
              style={{
                color: colorTheme.text2Color,
                borderColor: colorTheme.text8Color,
                backgroundColor: colorTheme.text8Color
              }}
            />
          </Col>
        </Row>
        <ErrorMessage message={errorMessage} hasError={hasError} />
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

export default connect(
  mapStateToProps,
  null
)(InputField);
