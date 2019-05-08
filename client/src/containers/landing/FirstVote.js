import React, { Component } from "react";
import { connect } from "react-redux";
import * as landingActionCreators from "../../actions/landing";
import { bindActionCreators } from "redux";
import { GREY_9, GREY_7, GREY_1 } from "../styles/ColorConstants";
import LoginButtons from "./LoginButtons";
import { Modal, Row, Col } from "antd";

class FirstVote extends Component {
  render() {
    const { isFirstVoteModalOpen, windowWidth } = this.props;

    let h2LineHeight = 1;
    let h2FontSize = 32;
    let innerModalPadding = "60px";
    let h4FontSize = 22;
    let h4Padding = "60px 0px 0px";
    if (windowWidth < 768) {
      h2LineHeight = 1.2;
      h2FontSize = 24;
      innerModalPadding = "30px 35px";
      h4FontSize = 20;
      h4Padding = "30px 0px 0px";
    }

    return (
      <Modal
        visible={true} //isFirstVoteModalOpen
        onCancel={e => this.props.closeFirstVoteModal()}
        footer={null}
        centered={true}
        bodyStyle={{ padding: innerModalPadding, backgroundColor: GREY_1 }}
        style={{ padding: "90px 0px 0px 0px" }} // modal relative to screen
      >
        <Row>
          <Col>
            <h2
              style={{
                textAlign: "center",
                color: GREY_9,
                fontFamily: "Overpass",
                fontWeight: "bold",
                fontSize: h2FontSize,
                marginBottom: 0,
                lineHeight: h2LineHeight
              }}
            >
              Congrats on your first vote!
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4
              style={{
                textAlign: "center",
                color: GREY_7,
                fontFamily: "Overpass",
                fontSize: h4FontSize,
                padding: h4Padding,
                marginBottom: 0,
                lineHeight: 1
              }}
            >
              To make your vote count,
            </h4>
          </Col>
        </Row>
        <Row
          style={{ padding: "30px 0px 0px 0px" }}
          type="flex"
          justify="center"
        >
          <Col>
            <LoginButtons />
          </Col>
        </Row>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFirstVoteModalOpen: state.landing.isFirstVoteModalOpen,
    windowWidth: state.customHeader.windowWidth
  };
}

function mapDispatchToProps(dispatch) {
  const landingDispatchers = bindActionCreators(
    landingActionCreators,
    dispatch
  );

  return {
    closeFirstVoteModal: () => {
      landingDispatchers.closeFirstVoteModal();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstVote);
