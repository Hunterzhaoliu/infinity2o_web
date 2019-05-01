import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Icon } from "antd";

class Github extends Component {
  render() {
    const { value, colorTheme } = this.props;

    if (value !== undefined && value !== null && value.length > 0) {
      return (
        <Col style={{ padding: "0px 0px 0px 10px" }}>
          <a href={value} target="_blank">
            <Icon
              style={{
                fontSize: "25px",
                color: colorTheme.text2Color
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

function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme
  };
}

export default connect(
  mapStateToProps,
  null
)(Github);
