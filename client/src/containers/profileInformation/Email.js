import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import Emoji from "../styles/Emoji";

class Email extends Component {
  render() {
    const { email, textColor } = this.props;
    return (
      <Row
        style={{ padding: "15px 0px 0px 0px" }}
        type="flex"
        justify="start"
        align="middle"
      >
        <Col span={1}>
          <Emoji fontSize={24} label="email" symbol="✉️ " />
        </Col>
        <Col
          span={23}
          style={{
            padding: "0px 0px 0px 20px",
            fontFamily: "Overpass",
            lineHeight: 1,
            marginBottom: 0,
            fontSize: 16,
            color: textColor
          }}
        >
          {email}
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  null
)(Email);
