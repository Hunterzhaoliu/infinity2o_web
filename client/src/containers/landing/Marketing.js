import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_2, GREY_1 } from "../styles/ColorConstants";
import { Row, Col } from "antd";
import onlineClassAloneBoy from "../images/onlineClassAloneBoy.png";
import onlineClassAloneGirl from "../images/onlineClassAloneGirl.png";
import futureOnlineClasses from "../images/futureOnlineClasses.png";

class Marketing extends Component {
  renderCartoons() {
    const { windowWidth } = this.props;

    let h3Padding = "60px 0px 0px 0px";
    let imagePadding = "30px 0px 0px 0px";
    let h3FontSize = 28;
    let imageHeight = "250px";
    if (windowWidth < 768) {
      h3Padding = "30px 0px 0px 0px";
      imagePadding = "15px 0px 0px 0px";
      h3FontSize = 18;
      imageHeight = "150px";
    }

    return (
      <div>
        <Row type="flex" justify="left">
          <Col
            style={{
              padding: h3Padding
            }}
            xs={{ span: 24 }}
            sm={{ span: 11 }}
            md={{ span: 12 }}
            lg={{ span: 11 }}
            xl={{ offset: 3, span: 9 }} // half of the screen
          >
            <Row type="flex" justify="center">
              <Col>
                <h3
                  style={{
                    color: GREY_2,
                    fontFamily: "Overpass",
                    fontWeight: "bold",
                    fontSize: h3FontSize,
                    marginBottom: 0,
                    lineHeight: 1
                  }}
                >
                  Online class alone
                </h3>
              </Col>
            </Row>
            <Row
              style={{
                padding: imagePadding
              }}
              type="flex"
              justify="center"
            >
              <Col>
                <img
                  alt=""
                  style={{
                    height: imageHeight
                  }}
                  src={onlineClassAloneBoy}
                />
              </Col>
              <Col>
                <img
                  alt=""
                  style={{
                    height: imageHeight
                  }}
                  src={onlineClassAloneGirl}
                />
              </Col>
            </Row>
          </Col>
          <Col
            style={{
              padding: h3Padding
            }}
            xs={{ span: 24 }}
            sm={{ span: 11 }}
            md={{ span: 12 }}
            lg={{ span: 11 }}
            xl={{ span: 7 }}
          >
            <Row type="flex" justify="center">
              <Col>
                <h3
                  style={{
                    textAlign: "center",
                    color: GREY_2,
                    fontFamily: "Overpass",
                    fontWeight: "bold",
                    fontSize: h3FontSize,
                    marginBottom: 0,
                    lineHeight: 1
                  }}
                >
                  Online class through infinity2o
                </h3>
              </Col>
            </Row>
            <Row
              style={{
                padding: imagePadding
              }}
              type="flex"
              justify="center"
            >
              <Col>
                <img
                  alt=""
                  style={{
                    height: imageHeight
                  }}
                  src={futureOnlineClasses}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

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
                fontFamily: "Overpass",
                fontWeight: "bold",
                marginBottom: 0,
                lineHeight: 1
              }}
            >
              Meet your online course partner.
            </h1>
          </Col>
        </Row>
        {this.renderCartoons()}
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
