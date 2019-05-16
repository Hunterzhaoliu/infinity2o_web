import React, { Component } from "react";
import { connect } from "react-redux";
import "./general-header-button.css";

class LogoutButton extends Component {
  render() {
    const { colorTheme } = this.props;

    return (
      <a className="header-anchor" href="/api/logout">
        <button
          className="general-header-button"
          style={{ color: colorTheme.text6Color }}
        >
          Logout
        </button>
      </a>
    );
  }
}

function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme
  };
}

export default connect(mapStateToProps)(LogoutButton);
