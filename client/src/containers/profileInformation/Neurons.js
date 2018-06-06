import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import DisplayField from "../profile/DisplayField";

class Neurons extends Component {
  render() {
    const { value } = this.props;
    let neuronsInBillions = value;
    if (neuronsInBillions !== undefined) {
      neuronsInBillions = neuronsInBillions.toFixed(1);
    }
    return (
      <Row
        type="flex"
        justify="start"
        align="middle"
        style={{
          padding: "0px 0px 0px" // top right bottom left
        }}
      >
        <Col span={1}>
          <img
            alt="Neurons: "
            style={{
              width: "35px",
              padding: "10px 0px 0px 0px" // top right bottom left
            }}
            src="https://user-images.githubusercontent.com/24757872/40867763-8f2df248-65cc-11e8-892f-3e22b4032b4a.png"
          />
        </Col>
        <Col
          span={23}
          style={{
            padding: "0px 0px 0px 20px" // top right bottom left
          }}
        >
          <DisplayField label="Neurons: " value={neuronsInBillions} />
        </Col>
      </Row>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Neurons);
