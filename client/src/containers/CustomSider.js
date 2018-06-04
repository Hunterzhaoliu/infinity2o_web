import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as customHeaderActionCreators from "../actions/customHeader";
import * as colorThemeActionCreators from "../actions/colorTheme";
import * as authActionCreators from "../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Button } from "antd";
const { Sider } = Layout;

class CustomSider extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUserProfile(); // to show correct neuron number
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

  renderSaveIcon(saveState) {
    if (saveState === "save_start") {
      return <Icon style={{ padding: "0px 8px 0px" }} type="loading" />;
    } else if (saveState === "save_done") {
      return;
    } else if (saveState === "save_error") {
      return <Icon style={{ padding: "0px 8px 0px" }} type="warning" />;
    }
  }

  renderChangeThemeButton() {
    const { colorTheme, onRandomColorTheme, colorThemeSave } = this.props;

    if (colorThemeSave === "save_done" || colorThemeSave === null) {
      return (
        <Button
          style={{
            borderColor: colorTheme.text7Color,
            background: colorTheme.text7Color,
            color: colorTheme.text4Color
          }}
          onClick={onRandomColorTheme}
        >
          <img
            alt=""
            style={{ width: "30px" }}
            src="https://user-images.githubusercontent.com/2585159/40581477-fe1ecac2-611e-11e8-9c30-ab8a66644425.png"
          />
        </Button>
      );
    } else {
      return (
        <Button
          style={{
            borderColor: colorTheme.text7Color,
            background: colorTheme.text7Color,
            color: colorTheme.text4Color
          }}
          onClick={onRandomColorTheme}
        >
          {this.renderSaveIcon(colorThemeSave)}
        </Button>
      );
    }
  }

  renderTourButton() {
    const { colorTheme, onTour } = this.props;

    return (
      <Button
        style={{
          fontSize: 17,
          borderColor: colorTheme.tourButtonColor,
          background: colorTheme.tourButtonColor,
          color: colorTheme.tourButtonTextColor,
          padding: "0px 0px 0px 0px",
          width: 34
        }}
        onClick={onTour}
      >
        <Link to="/tour">
          <img
            alt=""
            style={{ width: 22, padding: "0px 0px 1px 0px" }}
            src="https://user-images.githubusercontent.com/24757872/40939951-cffbddd0-680b-11e8-870f-21ab81eabc02.png"
          />
        </Link>
      </Button>
    );
  }

  renderProfileButton() {
    const {
      colorTheme,
      onProfile,
      neuronsInBillions,
      infinityStatus
    } = this.props;
    let shortNeuronsInBillions;
    if (neuronsInBillions !== undefined) {
      shortNeuronsInBillions = neuronsInBillions.toFixed(1);
    }
    let displayText = " " + shortNeuronsInBillions + " B";
    if (infinityStatus) {
      displayText = " ∞";
    }
    return (
      <Button
        style={{
          borderColor: colorTheme.profileButtonColor,
          background: colorTheme.profileButtonColor,
          color: colorTheme.profileButtonTextColor
        }}
        onClick={onProfile}
      >
        <Link to="/profile">
          <div style={{ padding: "1px 0px 0px" }}>
            <img
              alt=""
              style={{ width: 20, padding: "1px 0px 0px" }}
              src="https://user-images.githubusercontent.com/24757872/40881386-00fbc094-668b-11e8-96ca-47c0a9fafd56.png"
            />
            {displayText}
          </div>
        </Link>
      </Button>
    );
  }

  renderSortingHatButton() {
    const { colorTheme, onSortingHat } = this.props;

    return (
      <Button
        style={{
          borderColor: colorTheme.sortingHatButtonColor,
          background: colorTheme.sortingHatButtonColor,
          color: colorTheme.sortingHatButtonTextColor
        }}
        onClick={onSortingHat}
      >
        <Link to="/sorting_hat">
          <img
            alt=""
            style={{ width: 30, padding: "0px 0px 3px" }}
            src="https://user-images.githubusercontent.com/24757872/40881487-37bb7a50-668d-11e8-8d2e-d3be80bdef09.png"
          />Sorting Hat
        </Link>
      </Button>
    );
  }

  renderMatchesButton() {
    const { colorTheme, onMatches } = this.props;

    return (
      <Button
        style={{
          borderColor: colorTheme.matchesButtonColor,
          background: colorTheme.matchesButtonColor,
          color: colorTheme.matchesButtonTextColor
        }}
        onClick={onMatches}
      >
        <Link to="/matches">
          <img
            alt=""
            style={{ width: 32, padding: "0px 0px 1px" }}
            src="https://user-images.githubusercontent.com/24757872/40881562-23db47c0-668f-11e8-84a6-29020f352353.png"
          />Matches
        </Link>
      </Button>
    );
  }

  renderConversationsButton() {
    const { colorTheme, onPressConversations } = this.props;

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
        onClick={onPressConversations}
      >
        <Link to="/conversations">
          <img
            alt=""
            style={{ width: 18, padding: "0px 0px 4px" }}
            src="https://user-images.githubusercontent.com/24757872/40881815-7ea6867c-6696-11e8-9690-4b691d249fa8.png"
          />
        </Link>
      </Button>
    );
  }

  renderLogoutButton() {
    const { colorTheme } = this.props;

    return (
      <Button
        style={{
          borderColor: colorTheme.text7Color,
          background: colorTheme.text7Color,
          color: colorTheme.text4Color,
          padding: "0px 0px 0px",
          width: 38
        }}
      >
        <a href="/api/logout">
          <img
            alt=""
            style={{ width: 20, padding: "0px 0px 1px" }}
            src="https://user-images.githubusercontent.com/24757872/40881894-17153326-6698-11e8-960e-0c08d872b139.png"
          />
        </a>
      </Button>
    );
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
            borderColor: colorTheme.text6Color,
            background: colorTheme.text6Color
          }}
          width={180}
        >
          <Menu
            style={{
              borderColor: colorTheme.text6Color,
              background: colorTheme.text6Color
            }}
            mode="inline"
          >
            <Menu.Item key="1">{this.renderChangeThemeButton()}</Menu.Item>
            <Menu.Item key="2">{this.renderTourButton()}</Menu.Item>
            <Menu.Item key="3">{this.renderProfileButton()}</Menu.Item>
            <Menu.Item key="4">{this.renderSortingHatButton()}</Menu.Item>
            <Menu.Item key="5">{this.renderMatchesButton()}</Menu.Item>
            <Menu.Item key="6">{this.renderConversationsButton()}</Menu.Item>
            <Menu.Item key="7">{this.renderLogoutButton()}</Menu.Item>
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
    auth: state.auth,
    colorTheme: state.colorTheme,
    neuronsInBillions: state.profile.payment.neuronsInBillions,
    infinityStatus: state.profile.payment.infinityStatus,
    windowWidth: state.customHeader.windowWidth,
    siderDisplay: state.customHeader.siderDisplay,
    loggedInState: state.auth.loggedInState,
    colorThemeSave: state.profile.colorThemeSave
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
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);
  const customHeaderDispatchers = bindActionCreators(
    customHeaderActionCreators,
    dispatch
  );
  return {
    onRandomColorTheme: () => {
      colorThemeDispatchers.generateRandomColorTheme();
    },
    onProfile: () => {
      colorThemeDispatchers.onProfile();
    },
    onSortingHat: () => {
      colorThemeDispatchers.onSortingHat();
    },
    onMatches: () => {
      colorThemeDispatchers.onMatches();
    },
    onPressConversations: () => {
      colorThemeDispatchers.onConversations();
    },
    onTour: () => {
      colorThemeDispatchers.onTour();
    },
    fetchUserProfile: () => {
      authDispatchers.fetchUserProfile();
    },
    updateWindowWidth: newWindowWidth => {
      customHeaderDispatchers.updateWindowWidth(newWindowWidth);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSider);
