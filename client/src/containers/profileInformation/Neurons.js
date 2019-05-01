import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Popover, Icon } from "antd";
import "./neurons.css";
import Emoji from "../styles/Emoji";

class Neurons extends Component {
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  renderNumberOfNeurons() {
    const { payment } = this.props;

    if (payment.infinityStatus) {
      return (
        <Col>
          <p>"infinity"</p>
        </Col>
      );
    } else {
      let displayNeuronsInBillions = payment.neuronsInBillions.toFixed(1);
      if (displayNeuronsInBillions !== undefined) {
        return (
          this.numberWithCommas(displayNeuronsInBillions * 1000000000) +
          " (" +
          displayNeuronsInBillions +
          " Billion) Neurons"
        );
      }
    }
  }
  renderNeuronExplanation() {
    const { colorTheme } = this.props;
    document.documentElement.style.setProperty(
      `--text7Color`,
      colorTheme.text7Color
    );
    document.documentElement.style.setProperty(
      `--text8Color`,
      colorTheme.text8Color
    );

    const neuronExplanation = (
      <div>
        <p
          style={{
            color: colorTheme.text2Color,
            fontFamily: "Overpass",
            lineHeight: 1.5,
            marginBottom: 0,
            fontSize: 14
          }}
        >
          Use neurons to 'Say Hi' to more matches.
        </p>
      </div>
    );

    return (
      <Popover content={neuronExplanation}>
        <button
          className="popover-button"
          style={{
            borderColor: colorTheme.backgroundColor,
            backgroundColor: colorTheme.backgroundColor,
            color: colorTheme.text3Color
          }}
        >
          <Icon
            style={{
              fontSize: 12,
              padding: "0px 0px 6px"
            }}
            type="question-circle-o"
          />
        </button>
      </Popover>
    );
  }

  render() {
    const { textColor } = this.props;
    return (
      <Row
        style={{
          padding: "15px 0px 0px 0px"
        }}
        type="flex"
        justify="start"
        align="middle"
      >
        <Col span={1}>
          <Emoji fontSize={24} label="Neurons" symbol="🧠 " />
        </Col>
        <Col
          style={{
            padding: "0px 0px 0px 20px",
            fontFamily: "Overpass",
            lineHeight: 1,
            marginBottom: 0,
            fontSize: 16,
            color: textColor
          }}
        >
          {this.renderNumberOfNeurons()}
        </Col>
        <Col offset={1}>{this.renderNeuronExplanation()}</Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    colorTheme: state.colorTheme
  };
}

export default connect(
  mapStateToProps,
  null
)(Neurons);
