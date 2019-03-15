import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Row, Col } from "antd";

class Email extends Component {
	render() {
		const { email } = this.props;
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
						src="https://user-images.githubusercontent.com/24757872/40867452-d7a6feaa-65c9-11e8-849f-9d144103b0c3.png"
					/>
				</Col>
				<Col
					span={23}
					style={{
						padding: "0px 0px 0px 20px",
						fontFamily: "Overpass",
						lineHeight: 1,
						marginBottom: 0,
						fontSize: 16
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
