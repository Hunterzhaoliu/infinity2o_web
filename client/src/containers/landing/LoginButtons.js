import React from "react";
import { GREY_9, BLUE_3, RED_ORANGE_3 } from "../styles/ColorConstants";
import { Button, Row, Col, Icon } from "antd";

export default () => {
	return (
		<Row type="flex" justify="center">
			<Col
				style={{
					padding: "0px 30px 0px 0px" // top left&right bottom
				}}
			>
				<Button
					size="large"
					key="-1"
					style={{
						borderColor: RED_ORANGE_3,
						background: RED_ORANGE_3,
						color: GREY_9,
						fontFamily: "Titillium Web"
					}}
				>
					<a href="/auth/google">
						Gmail Login{" "}
						<Icon style={{ fontSize: 18 }} type="google" />
					</a>
				</Button>
			</Col>
			<Col
				style={{
					padding: "0px 0px 0px 10px" // top left&right bottom
				}}
			>
				<Button
					size="large"
					key="0"
					style={{
						borderColor: BLUE_3,
						background: BLUE_3,
						color: GREY_9,
						fontFamily: "Titillium Web"
					}}
				>
					<a href="/auth/linkedIn">
						LinkedIn Login{" "}
						<Icon style={{ fontSize: 18 }} type="linkedin" />
					</a>
				</Button>
			</Col>
		</Row>
	);
};
