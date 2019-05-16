import React, { Component } from "react";
import { connect } from "react-redux";
import * as unsubscribeActionCreators from "../../actions/unsubscribe";
import { bindActionCreators } from "redux";
import { GREY_7, GREY_1, GREY_DOT_5 } from "../styles/ColorConstants";
import { Layout, Row, Col, Card } from "antd";
import logo from "../images/logo.png";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Unsubscribe extends Component {
  componentDidMount() {
    // run once before first render()
    const URLArray = window.location.href.split("/");
    // URLArray =  [ "http:", "", "localhost:3000", "unsubscribe", "5ad55047b4e23300148b0cd7" ]
    const userId = URLArray[4];
    this.props.userUnsubscribed(userId);
  }
  render() {
    const { name, loggedInState, colorTheme } = this.props;
    const userFirstName = name.split(" ")[0];
    let backgroundColor = GREY_1;
    let cardColor = GREY_DOT_5;
    let textColor = GREY_7;
    if (loggedInState === "logged_in") {
      backgroundColor = colorTheme.backgroundColor;
      cardColor = colorTheme.textDot5Color;
      textColor = colorTheme.text1Color;
    }

    const greeting = "Hey " + userFirstName + ",";
    const thankfulNote = "thanks for being a part of ";

    return (
      <Content
        style={{
          textAlign: "center",
          padding: "120px 0px 0px 0px",
          background: backgroundColor
        }}
      >
        <Helmet>
          <title>Unsubscribe</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Row type="flex" justify="center" align="top">
          <Col>
            <Card
              loading={false}
              style={{
                color: textColor,
                background: cardColor
              }}
              bodyStyle={{ padding: "60px" }} // padding around inside border of card
            >
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <h2
                    style={{
                      fontSize: "30px",
                      fontFamily: "Overpass",
                      lineHeight: 1,
                      marginBottom: 0
                    }}
                  >
                    {greeting}
                  </h2>
                </Col>
              </Row>
              <Row
                style={{ padding: "15px 0px 20px" }}
                type="flex"
                justify="center"
                align="middle"
              >
                <Col>
                  <h4
                    style={{
                      fontSize: "24px",
                      fontFamily: "Overpass",
                      lineHeight: 1,
                      marginBottom: 0,
                      padding: "0px 10px 0px 0px"
                    }}
                  >
                    {thankfulNote}
                  </h4>
                </Col>
                <Col>
                  <img alt="" src={logo} width="50px" />
                </Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <hr
                    style={{
                      border: "none",
                      backgroundColor: backgroundColor,
                      height: "2px"
                    }}
                    width="250px"
                  />
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ padding: "30px 0px 0px" }}
              >
                <Col>
                  <p
                    style={{
                      fontSize: "18px",
                      fontFamily: "Overpass",
                      marginBottom: 0
                    }}
                  >
                    &#123; Insert super long reason why you should stay <br />
                    subscribed to our email service &#125;
                  </p>
                </Col>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unsubscribe);
