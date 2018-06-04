import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as customHeaderActionCreators from "../actions/customHeader";
import { Layout, Row, Col, Button, Icon } from "antd";
import ChangeThemeButton from "./navigationButtons/ChangeThemeButton";
import TourButton from "./navigationButtons/TourButton";
import ProfileButton from "./navigationButtons/ProfileButton";
import SortingHatButton from "./navigationButtons/SortingHatButton";
import MatchesButton from "./navigationButtons/MatchesButton";
import ConversationButton from "./navigationButtons/ConversationButton";
import LogoutButton from "./navigationButtons/LogoutButton";

const { Header } = Layout;

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.updateWindowWidth(window.innerWidth);
  }

  renderHeaderButtons() {
    const {
      colorTheme,
      loggedInState,
      windowWidth,
      siderDisplay,
      toggleSider
    } = this.props;
    if (windowWidth < 768) {
      // show a menu with buttons instead of nav bar
      let siderIcon;
      if (siderDisplay === false) {
        siderIcon = "menu-unfold";
      } else {
        siderIcon = "menu-fold";
      }

      return (
        <Row type="flex" justify="start">
          <Col
            style={{
              padding: "3px 0px 0px"
            }}
            key="0"
          >
            <Button
              style={{
                borderColor: colorTheme.text7Color,
                background: colorTheme.text7Color,
                color: colorTheme.text2Color
              }}
              onClick={toggleSider}
            >
              <Icon type={siderIcon} />
            </Button>
          </Col>
        </Row>
      );
    }
    switch (loggedInState) {
      case "not_logged_in":
        return;
      case "logged_in":
        return (
          <div>
            <Row type="flex" justify="space-between">
              <Col
                style={{ padding: "0px 0px 0px" }}
                md={{ span: 22, offset: 0 }}
                lg={{ span: 22, offset: 0 }}
                xl={{ span: 22, offset: 0 }}
                key="0"
              >
                <Row type="flex">
                  <ChangeThemeButton />
                  <TourButton />
                  <ProfileButton />
                  <SortingHatButton />
                  <MatchesButton />
                  <ConversationButton />
                </Row>
              </Col>
              <LogoutButton />
            </Row>
          </div>
        );
      default:
        console.log("ERROR: site in invalid state = ", loggedInState);
    }
  }

  render() {
    const { colorTheme, loggedInState } = this.props;
    let headerBackground;
    switch (loggedInState) {
      case "not_logged_in":
        headerBackground = colorTheme.backgroundColor;
        break;
      case "logged_in":
        headerBackground = colorTheme.text8Color;
        break;
      default:
    }
    return (
      <Header
        style={{
          background: headerBackground,
          position: "fixed",
          zIndex: 1, // make every component display under the header
          width: "100%"
        }}
      >
        {this.renderHeaderButtons()}
      </Header>
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
    windowWidth: state.customHeader.windowWidth,
    siderDisplay: state.customHeader.siderDisplay,
    loggedInState: state.auth.loggedInState
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const customHeaderDispatchers = bindActionCreators(
    customHeaderActionCreators,
    dispatch
  );
  return {
    updateWindowWidth: newWindowWidth => {
      customHeaderDispatchers.updateWindowWidth(newWindowWidth);
    },
    toggleSider: () => {
      customHeaderDispatchers.toggleSider();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
