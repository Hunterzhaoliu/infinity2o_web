import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import timeZoneIcon from "../images/timeZoneIcon.png";

class TimeZone extends Component {
	render() {
		const { timeZone, textColor } = this.props;
		if (
			timeZone !== null &&
			timeZone !== undefined &&
			timeZone.length > 0
		) {
			return (
				<Row
					style={{ padding: "15px 0px 0px 0px" }}
					type="flex"
					justify="start"
					align="middle"
				>
					<Col span={1}>
						<img
							alt="Time Zone: "
							style={{
								width: "25px",
								padding: "0px 0px 0px 0px"
							}}
							src={timeZoneIcon}
						/>
					</Col>
					<Col
						span={23}
						style={{
							padding: "0px 0px 0px 20px",
							fontFamily: "Overpass",
							lineHeight: 1,
							marginBottom: 0,
							fontSize: 16,
							color: textColor
						}}
					>
						{timeZone[1]}
					</Col>
				</Row>
			);
		} else {
			return <div />;
		}
	}
}

export default connect(
	null,
	null
)(TimeZone);
