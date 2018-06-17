import React, { Component } from "react";
import { connect } from "react-redux";
import * as sortingHatActionCreators from "../../actions/sorting_hat/sortingHat";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import { Layout, Row, Col, Button } from "antd";
import InputVote from "./InputVote";
const { Content } = Layout;

class SortingHat extends Component {
  componentWillMount() {
    // run once before first render()
    this.props.onSortingHat();
    this.props.fetchUserSortingHatAsks(this.props.auth.mongoDBUserId);
  }

  render() {
    // console.log('this.props in SortingHat.js', this.props);
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
            textAlign: "center"
          }}
        >
          <Col>
            <h2
              style={{
                color: colorTheme.text2Color,
                padding: "12px 0px 0px" // top left&right bottom
              }}
            >
              Help the Sorting Hat find you great partners by
            </h2>
          </Col>
          <Col
            style={{
              padding: "0px 0px 0px 8px" // top left&right bottom
            }}
          >
            <Button
              style={{
                borderColor: colorTheme.keyText7Color,
                background: colorTheme.keyText7Color
              }}
            >
              <a href="/sorting_hat/ask">
                <p
                  style={{
                    color: colorTheme.text2Color,
                    fontSize: 20
                  }}
                >
                  asking a question
                </p>
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
              Or voting on questions that matter to you:
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
    colorTheme: state.colorTheme,
    auth: state.auth
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );

  const sortingHatDispatchers = bindActionCreators(
    sortingHatActionCreators,
    dispatch
  );

  return {
    onSortingHat: () => {
      colorThemeDispatchers.onSortingHat();
    },
    fetchUserSortingHatAsks: mongoDBUserId => {
      sortingHatDispatchers.fetchUserSortingHatAsks(mongoDBUserId);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortingHat);
