import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Icon } from "antd";

class Github extends Component {
  render() {
    const { value, colorTheme } = this.props;
    if (value !== undefined) {
      return (
        <Col style={{ padding: "0px 0px 0px 29px" }}>
          <a href={value} target="_blank">
            <Icon
              alt="Github: "
              style={{ fontSize: "35px", color: colorTheme.text3Color }}
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

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);
