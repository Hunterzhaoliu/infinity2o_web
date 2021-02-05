import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_2, GREY_1 } from "../styles/ColorConstants";
import { Row, Col } from "antd";
import onlineClassAloneBoy from "../images/onlineClassAloneBoy.png";
import onlineClassAloneGirl from "../images/onlineClassAloneGirl.png";
import futureOnlineClasses from "../images/futureOnlineClasses.png";
import { FONT } from "../styles/Font";

class Marketing extends Component {

  render() {
    const { windowWidth } = this.props;

    let h1Padding = "180px 0px 0px 0px";
    let endColumnHeight = "120px";
    let h1FontSize = 56;
    if (windowWidth < 768) {
      h1Padding = "120px 0px 0px 0px";
      h1FontSize = 24;
      endColumnHeight = "60px";
    }

    return (
      <div>
        <Row type="flex" justify="center" style={{ padding: h1Padding }}>
          <Col
            xs={{ span: 21 }}
            sm={{ span: 21 }}
            md={{ span: 22 }}
            lg={{ span: 23 }}
            xl={{ span: 24 }}
          >
            <h1
              key="0"
              style={{
                textAlign: "center",
                color: GREY_1,
                fontSize: h1FontSize,
                fontFamily: FONT,
                marginBottom: 0,
                lineHeight: 1,
                padding: "0px 20px 0px 20px" // top right bottom left
              }}
            >
              We securely save all your DNA & epigenomes in computers as the
              first step to reversing your biological age
            </h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ padding: h1Padding }}>
          <Col
            xs={{ span: 21 }}
            sm={{ span: 21 }}
            md={{ span: 22 }}
            lg={{ span: 23 }}
            xl={{ span: 24 }}
          >
            <h2
              key="0"
              style={{
                textAlign: "center",
                color: GREY_1,
                fontSize: h1FontSize-4,
                fontFamily: FONT,
                marginBottom: 0,
                lineHeight: 1,
                padding: "0px 20px 0px 20px" // top right bottom left
              }}
            >
              Using the most accurate & cost effective DNA sequencer on Earth
              NovaSeq 6000
            </h2>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ padding: h1Padding }}>
          <Col
            xs={{ span: 21 }}
            sm={{ span: 21 }}
            md={{ span: 22 }}
            lg={{ span: 23 }}
            xl={{ span: 24 }}
          >
            <h2
              key="0"
              style={{
                textAlign: "center",
                color: GREY_1,
                fontSize: h1FontSize-4,
                fontFamily: FONT,
                marginBottom: 0,
                lineHeight: 1,
                padding: "0px 20px 0px 20px" // top right bottom left
              }}
            >
              Save all your DNA & epigenomes in secure computers you can visit
              online or in-person
            </h2>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ padding: h1Padding }}>
          <Col
            xs={{ span: 21 }}
            sm={{ span: 21 }}
            md={{ span: 22 }}
            lg={{ span: 23 }}
            xl={{ span: 24 }}
          >
            <h2
              key="0"
              style={{
                textAlign: "center",
                color: GREY_1,
                fontSize: h1FontSize-4,
                fontFamily: FONT,
                marginBottom: 0,
                lineHeight: 1,
                padding: "0px 20px 0px 20px" // top right bottom left
              }}
            >
              As genetic & epigenetic engineering advances, in the future
              you will be able to revert your body to a previous healthier
              version like a 4D real-time 100% immersive video game
            </h2>
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ padding: h1Padding }}>
          <Col
            xs={{ span: 21 }}
            sm={{ span: 21 }}
            md={{ span: 22 }}
            lg={{ span: 23 }}
            xl={{ span: 24 }}
          >
            <h2
              key="0"
              style={{
                textAlign: "center",
                color: GREY_1,
                fontSize: h1FontSize-4,
                fontFamily: FONT,
                marginBottom: 0,
                lineHeight: 1,
                padding: "0px 20px 0px 20px" // top right bottom left
              }}
            >
              Video series on exactly how genetic engineering technologies work
            </h2>
          </Col>
        </Row>
        <Row>
          <Col style={{ height: endColumnHeight }} />
        </Row>
      </div>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    windowWidth: state.customHeader.windowWidth
  };
}

export default connect(
  mapStateToProps,
  null
)(Marketing);
