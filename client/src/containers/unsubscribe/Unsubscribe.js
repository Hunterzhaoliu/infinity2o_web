import React, { Component } from "react";
import { connect } from "react-redux";
import * as unsubscribeActionCreators from "../../actions/unsubscribe";
import { bindActionCreators } from "redux";
import { Layout, Row, Col, Button } from "antd";
const { Content } = Layout;

class Unsubscribe extends Component {
  componentWillMount() {
    // run once before first render()
    const URLArray = window.location.href.split("/");
    // URLArray =  [ "http:", "", "localhost:3000", "unsubscribe", "5ad55047b4e23300148b0cd7" ]
    const userId = URLArray[4];
    this.props.userUnsubscribed(userId);
  }

  render() {
    const { colorTheme, name } = this.props;
    const userFirstName = name.split(" ")[0];
    return (
      <Content
        style={{
          textAlign: "center",
          padding: "75px 0px 0px 0px",
          background: colorTheme.backgroundColor
        }}
      >
        Hey {userFirstName}
      </Content>
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
    name: state.profile.name
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const unsubscribeDispatchers = bindActionCreators(
    unsubscribeActionCreators,
    dispatch
  );

  return {
    userUnsubscribed: userId => {
      unsubscribeDispatchers.userUnsubscribed(userId);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Unsubscribe);
