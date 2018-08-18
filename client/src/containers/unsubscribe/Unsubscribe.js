import React, { Component } from "react";
import { connect } from "react-redux";
import * as unsubscribeActionCreators from "../../actions/unsubscribe";
import { bindActionCreators } from "redux";
import { GREY_7, GREY_2, GREY_1 } from "../styles/ColorConstants";
import LoginButtons from "../landing/LoginButtons";
import MatchesButton from "../navigationButtons/MatchesButton";
import { Layout, Row, Col, Card } from "antd";
import "./unsubscribe.css";
const { Content } = Layout;

class Unsubscribe extends Component {
  componentWillMount() {
    // run once before first render()
    const URLArray = window.location.href.split("/");
    // URLArray =  [ "http:", "", "localhost:3000", "unsubscribe", "5ad55047b4e23300148b0cd7" ]
    const userId = URLArray[4];
    this.props.userUnsubscribed(userId);
  }

  renderSeeMatchesButton(loggedInState) {
    if (loggedInState === "logged_in") {
      return <MatchesButton />;
    } else {
      return <LoginButtons />;
    }
  }
  render() {
    const { name, loggedInState, colorTheme } = this.props;
    const userFirstName = name.split(" ")[0];
    let backgroundColor = GREY_1;
    let borderColor = GREY_2;
    let textColor = GREY_7;
    if (loggedInState === "logged_in") {
      backgroundColor = colorTheme.backgroundColor;
      borderColor = colorTheme.text8Color;
      textColor = colorTheme.text1Color;
    }

    document.documentElement.style.setProperty(`--border-color`, borderColor);

    const titleMessage =
      "Hey " + userFirstName + ", thanks for becoming a part of ";

    return (
      <Content
        style={{
          textAlign: "center",
          padding: "75px 0px 0px 0px",
          background: backgroundColor
        }}
      >
        <Row type="flex" justify="center" align="top">
          <Col>
            <Card
              hoverable={true}
              loading={false}
              style={{
                color: textColor,
                background: backgroundColor
              }}
              className="card"
            >
              <Row type="flex" justify="center" align="middle">
                <Col style={{ fontSize: "30px", fontFamily: "Perpetua" }}>
                  {titleMessage}
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col style={{}}>
                  <img
                    alt="infinity2o logo"
                    src="https://user-images.githubusercontent.com/24757872/43986315-d41857d8-9cd4-11e8-902d-5ceb9d7cb367.png"
                    width="75px"
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <hr class="horizontal-line" width="300px" />
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ padding: "15px 0px 0px" }}
              >
                <Col>
                  <p style={{ fontSize: "20px", fontFamily: "Gill Sans" }}>
                    &#123; Insert super long reason why you should stay <br />
                    subscribed to our email service &#125;
                  </p>
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <p style={{ fontSize: "25px", fontFamily: "Gill Sans" }}>
                    Take a look at your matches
                  </p>
                </Col>
              </Row>
              <Row type="flex" justify="center" align="top">
                <Col>{this.renderSeeMatchesButton(loggedInState)}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
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
    name: state.profile.name,
    loggedInState: state.auth.loggedInState
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
