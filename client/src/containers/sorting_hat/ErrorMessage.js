import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

class ErrorMessage extends Component {
  render() {
    const { colorTheme, message, hasError } = this.props;
    if (hasError) {
      return (
        <Row
          style={{ padding: "5px 0px 0px 0px" }}
          type="flex"
          justify="start"
          align="middle"
        >
          <Col
            xs={{ offset: 0 }}
            sm={{ offset: 0 }}
            md={{ offset: 0 }}
            lg={{ offset: 0 }}
            xl={{ offset: 3 }}
          >
            <p
              style={{
                color: colorTheme.text3Color,
                fontFamily: "Overpass",
                lineHeight: 1,
                marginBottom: 0
              }}
            >
              {message}
            </p>
          </Col>
        </Row>
      );
    } else {
      return <div />;
    }
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
)(ErrorMessage);
