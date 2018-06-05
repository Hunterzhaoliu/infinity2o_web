import React, { Component } from "react";
import { connect } from "react-redux";
import * as authActionCreators from "../../actions/auth";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import { Layout, Row, Col, Button } from "antd";
import InputVote from "./InputVote";
const { Content } = Layout;

class SortingHat extends Component {
  componentWillMount() {
    // run once before first render()
    this.props.onSortingHat();
  }

  render() {
    //console.log('this.props in SortingHat.js', this.props);
    const { colorTheme, history } = this.props;
    return (
      <Content
        style={{
          padding: "75px 50px 0px", // top left&right bottom
          background: colorTheme.backgroundColor
        }}
      >
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{
            textAlign: "center",
            padding: "0px 0px 0px" // top left&right bottom
          }}
        >
          <Col>
            <h2
              style={{
                color: colorTheme.text2Color
              }}
            >
              Help the Sorting Hat find me great partners by...
            </h2>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{
            padding: "0px 0px 0px" // top left&right bottom
          }}
        >
          <Col>
            <h2
              style={{
                padding: "0px 0px 0px",
                textAlign: "center",
                color: colorTheme.text4Color
              }}
            >
              Asking questions:
            </h2>
          </Col>
          <Col
            sm={{ offset: 1 }}
            md={{ offset: 1 }}
            lg={{ offset: 1 }}
            xl={{ offset: 1 }}
            style={{ padding: "0px 0px 7px 0px" }}
          >
            <Button
              key="1"
              style={{
                borderColor: colorTheme.text7Color,
                background: colorTheme.text7Color,
                color: colorTheme.text2Color,
                width: 32,
                padding: "0px 0px 0px"
              }}
            >
              <a href="/sorting_hat/ask">
                <img
                  alt=""
                  style={{ width: 25, padding: "2px 0px 0px 2px" }}
                  src="https://user-images.githubusercontent.com/24757872/40990146-762c3ffc-68b5-11e8-80df-4c688ab3dd9b.png"
                />
              </a>
            </Button>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{
            padding: "0px 0px 0px" // top left&right bottom
          }}
        >
          <Col md={{ span: 24 }}>
            <h2
              style={{
                textAlign: "center",
                color: colorTheme.text4Color
              }}
            >
              Or voting on questions that matter to me:
            </h2>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{
            textAlign: "center",
            padding: "0px 0px 0px" // top left&right bottom
          }}
        >
          <Col
            sm={{ span: 0 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 5 }}
          />
          <Col
            sm={{ span: 24 }}
            md={{ span: 14 }}
            lg={{ span: 14 }}
            xl={{ span: 14 }}
          >
            <InputVote history={history} />
          </Col>
          <Col
            sm={{ span: 0 }}
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 5 }}
          />
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
    colorTheme: state.colorTheme
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const indexDispatchers = bindActionCreators(authActionCreators, dispatch);

  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );

  return {
    fetchUserProfile: () => {
      indexDispatchers.fetchUserProfile();
    },
    onSortingHat: () => {
      colorThemeDispatchers.onSortingHat();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortingHat);
