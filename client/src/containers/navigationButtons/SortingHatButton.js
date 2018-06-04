import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class SortingHatButton extends Component {
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
        <a href="/sorting_hat">
          <img
            alt=""
            style={{ width: 30, padding: "0px 0px 3px" }}
            src="https://user-images.githubusercontent.com/24757872/40881487-37bb7a50-668d-11e8-8d2e-d3be80bdef09.png"
          />Sorting Hat
        </a>
      </Button>
    );
  }

  render() {
    return (
      <Col
        style={{ padding: "1px 0px 0px" }}
        md={{ offset: 1 }}
        lg={{ offset: 1 }}
        xl={{ offset: 1 }}
        key="3"
      >
        {this.renderSortingHatButton()}
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
function mapDispatchToProps(dispatch) {
  const colorThemeDispatchers = bindActionCreators(
    colorThemeActionCreators,
    dispatch
  );
  return {
    onSortingHat: () => {
      colorThemeDispatchers.onSortingHat();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortingHatButton);
