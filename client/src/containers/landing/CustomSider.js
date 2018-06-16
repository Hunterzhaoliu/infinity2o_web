import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import ChangeThemeButton from "../navigationButtons/ChangeThemeButton";
import TourButton from "../navigationButtons/TourButton";
import ProfileButton from "../navigationButtons/ProfileButton";
import SortingHatButton from "../navigationButtons/SortingHatButton";
import MatchesButton from "../navigationButtons/MatchesButton";
import ConversationButton from "../navigationButtons/ConversationButton";
import LogoutButton from "../navigationButtons/LogoutButton";

const { Sider } = Layout;

class CustomSider extends Component {
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

export default connect(mapStateToProps, null)(CustomSider);
