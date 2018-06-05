import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class LogoutButton extends Component {
  renderLogoutButton() {
    const { colorTheme } = this.props;

    return (
      <Button
        style={{
          borderColor: colorTheme.text7Color,
          background: colorTheme.text7Color,
          color: colorTheme.text4Color,
          padding: "0px 0px 0px",
          width: 38
        }}
      >
        <a href="/api/logout">
          <img
            alt=""
            style={{ width: 20, padding: "0px 0px 1px" }}
            src="https://user-images.githubusercontent.com/24757872/40881894-17153326-6698-11e8-960e-0c08d872b139.png"
          />
        </a>
      </Button>
    );
  }

  render() {
    return (
      <Col
        style={{ padding: "0px 0px 0px" }}
        md={{ offset: 0 }}
        lg={{ offset: 0 }}
        xl={{ offset: 0 }}
        key="6"
      >
        {this.renderLogoutButton()}
      </Col>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
