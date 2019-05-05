import React, { Component } from "react";
import { connect } from "react-redux";
import * as colorThemeActions from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from "antd";
import { Helmet } from "react-helmet";

const { Content } = Layout;

class Tour extends Component {
  componentWillMount() {
    // run once before first render()

    this.props.onTour();
  }

  render() {
    const { colorTheme, windowWidth } = this.props;
    const WIDTH_RATIO = 0.7;
    const HEIGHT_RATIO = 0.38;
    const videoWidth = windowWidth * WIDTH_RATIO;
    const videoHeight = windowWidth * HEIGHT_RATIO;
    return (
      <Content
        style={{
          textAlign: "center",
          padding: 120,
          background: colorTheme.backgroundColor
        }}
      >
        <Helmet>
          <title>Tour</title>
        </Helmet>
        <Row type="flex" justify="center">
          <Col span={24}>
            <h2
              style={{
                color: colorTheme.text2Color,
                fontFamily: "Overpass",
                fontSize: "35px",
                fontWeight: "bold",
                padding: "25px 0px 0px 0px"
              }}
            >
              Welcome to infinity2o
            </h2>
          </Col>
        </Row>
        <Row
          style={{ padding: "25px 0px 0px 0px" }}
          type="flex"
          justify="center"
        >
          <Col span={24}>
            <iframe
              title="tour-video"
              width={videoWidth}
              height={videoHeight}
              src="https://www.youtube.com/embed/oQ2fWIce2JU?&autoplay=1"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              allowFullScreen
            />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <div style={{ height: "30px" }} />
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
    windowWidth: state.customHeader.windowWidth
  };
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  const customHeaderDispatchers = bindActionCreators(
    colorThemeActions,
    dispatch
  );

  return {
    onTour: () => {
      customHeaderDispatchers.onTour();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tour);
