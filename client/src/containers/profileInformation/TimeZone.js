import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

class TimeZone extends Component {
	render() {
		const { timeZone } = this.props;
		if (
			timeZone !== null &&
			timeZone !== undefined &&
			timeZone.length > 0
		) {
			return (
				<Row
					style={{ padding: "20px 0px 0px 20px" }}
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
							src="https://user-images.githubusercontent.com/24757872/40868790-25f907ea-65d6-11e8-8dd1-2f3a79076082.png"
						/>
					</Col>
					<Col
						span={23}
						style={{
							padding: "0px 0px 0px 20px",
							fontFamily: "Lucida Grande",
							lineHeight: 1,
							marginBottom: 0,
							fontSize: 16
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
