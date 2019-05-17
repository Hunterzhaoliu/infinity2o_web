import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Popover, Icon } from "antd";
import "./neurons.css";
import neuronsIcon from "../images/neuronsIcon.png";

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
        return displayNeuronsInBillions + " Billion Neurons";
      }
    }
  }
  renderNeuronExplanation() {
    const { colorTheme } = this.props;

    document.documentElement.style.setProperty(
      `--text8Color`,
      colorTheme.text8Color
    );
    document.documentElement.style.setProperty(
      `--backgroundColor`,
      colorTheme.backgroundColor
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
            backgroundColor: colorTheme.backgroundColor
          }}
        >
          <Icon
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: colorTheme.text6Color
            }}
            type="question"
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
          <img
            alt="Neurons: "
            style={{
              width: "25px"
            }}
            src={neuronsIcon}
          />
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
        <Col
          xs={{ offset: 3 }}
          sm={{ offset: 10 }}
          md={{ offset: 8 }}
          lg={{ offset: 8 }}
          xl={{ offset: 8 }}
        >
          {this.renderNeuronExplanation()}
        </Col>
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
