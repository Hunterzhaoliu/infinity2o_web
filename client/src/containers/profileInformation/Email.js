import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import emailIcon from "../images/emailIcon.png";

class Email extends Component {
	render() {
		const { email, textColor } = this.props;
		return (
			<Row
				style={{ padding: "15px 0px 0px 0px" }}
				type="flex"
				justify="start"
				align="middle"
			>
				<Col span={1}>
					<img
						alt="Email: "
						style={{
							width: "25px"
						}}
						src={emailIcon}
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
					{email}
				</Col>
			</Row>
		);
	}
}

export default connect(
	null,
	null
)(Email);
