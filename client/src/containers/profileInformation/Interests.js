import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import DisplayField from "../profile/DisplayField";

class Interests extends Component {
  render() {
    const { value } = this.props;
    if (value.length > 0) {
      return (
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            padding: "0px 0px 0px" // top right bottom left
          }}
        >
          <Col span={1}>
            <img
              alt="Interests: "
              style={{ width: "35px" }}
              src="https://user-images.githubusercontent.com/24757872/40868785-206477b0-65d6-11e8-9d7a-5482bcd504c3.png"
            />
          </Col>
          <Col
            span={23}
            style={{
              padding: "0px 0px 0px 20px" // top right bottom left
            }}
          >
            <DisplayField label="Interest(s): " value={value} />
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
  return {};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
