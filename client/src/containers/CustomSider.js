import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as customHeaderActionCreators from "../actions/customHeader";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import ChangeThemeButton from "./navigationButtons/ChangeThemeButton";
import TourButton from "./navigationButtons/TourButton";
import ProfileButton from "./navigationButtons/ProfileButton";
import SortingHatButton from "./navigationButtons/SortingHatButton";
import MatchesButton from "./navigationButtons/MatchesButton";
import ConversationButton from "./navigationButtons/ConversationButton";
import LogoutButton from "./navigationButtons/LogoutButton";

const { Sider } = Layout;

class CustomSider extends Component {
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

  render() {
    const { colorTheme, windowWidth, siderDisplay } = this.props;
    let isSiderCollapsed = !siderDisplay;
    if (windowWidth < 768) {
      return (
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={isSiderCollapsed}
          collapsedWidth={0}
          style={{
            borderColor: colorTheme.text8Color,
            background: colorTheme.text8Color
          }}
          width={180}
        >
          <Menu
            style={{
              borderColor: colorTheme.text8Color,
              background: colorTheme.text8Color
            }}
            mode="inline"
            selectable={false}
          >
            <Menu.Item key="1">
              <ChangeThemeButton />
            </Menu.Item>
            <Menu.Item key="2">
              <TourButton />
            </Menu.Item>
            <Menu.Item key="3">
              <ProfileButton />
            </Menu.Item>
            <Menu.Item key="4">
              <SortingHatButton />
            </Menu.Item>
            <Menu.Item key="5">
              <MatchesButton />
            </Menu.Item>
            <Menu.Item key="6">
              <ConversationButton />
            </Menu.Item>
            <Menu.Item key="7">
              <LogoutButton />
            </Menu.Item>
          </Menu>
        </Sider>
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
    colorTheme: state.colorTheme,

    windowWidth: state.customHeader.windowWidth,
    siderDisplay: state.customHeader.siderDisplay
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSider);
