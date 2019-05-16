import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Icon } from "antd";

class Github extends Component {
  render() {
    const { value } = this.props;

    if (value !== undefined && value !== null && value.length > 0) {
      return (
        <Col style={{ padding: "0px 0px 0px 10px" }}>
          <a href={value} target="_blank">
            <Icon
              alt="Github: "
              style={{
                fontSize: "25px",
                color: "rgb(51, 51, 51)"
              }}
              type="github"
            />
          </a>
        </Col>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  null,
  null
)(Github);
