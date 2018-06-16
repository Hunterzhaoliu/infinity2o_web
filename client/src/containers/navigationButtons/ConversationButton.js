import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class ConversationButton extends Component {
  renderConversationsButton() {
    const { colorTheme } = this.props;

    return (
      <Button
        style={{
          fontSize: 17,
          borderColor: colorTheme.conversationsButtonColor,
          background: colorTheme.conversationsButtonColor,
          color: colorTheme.conversationsButtonTextColor,
          padding: "0px 0px 0px",
          width: 35
        }}
      >
        <a href="/conversations">
          <img
            alt=""
            style={{ width: 18, padding: "0px 0px 4px" }}
            src="https://user-images.githubusercontent.com/24757872/40881815-7ea6867c-6696-11e8-9690-4b691d249fa8.png"
          />
        </a>
      </Button>
    );
  }

  render() {
    return (
      <Col
        style={{ padding: "1.5px 0px 0px" }}
        md={{ offset: 1 }}
        lg={{ offset: 1 }}
        xl={{ offset: 1 }}
        key="5"
      >
        {this.renderConversationsButton()}
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

export default connect(mapStateToProps, null)(ConversationButton);
