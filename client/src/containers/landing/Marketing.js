import React, { Component } from "react";
import { connect } from "react-redux";
import { GREY_2, GREY_1 } from "../styles/ColorConstants";
import { Row, Col } from "antd";

class Marketing extends Component {
	renderCartoons() {
		const { windowWidth } = this.props;

		let h2Padding = "60px 0px 0px 0px";
		let imagePadding = "30px 0px 0px 0px";
		let h2FontSize = 22;
		let imageHeight = "300px";
		if (windowWidth < 768) {
			h2Padding = "30px 0px 0px 0px";
			imagePadding = "15px 0px 0px 0px";
			h2FontSize = 18;
			imageHeight = "200px";
		}

		return (
			<div>
				<Row type="flex" justify="left">
					<Col
						style={{
							padding: h2Padding
						}}
						xs={{ span: 24 }}
						sm={{ span: 11 }}
						md={{ span: 10 }}
						lg={{ span: 11 }}
						xl={{ offset: 3, span: 9 }} // half of the screen
					>
						<Row type="flex" justify="center">
							<Col>
								<h2
									style={{
										color: GREY_2,
										fontFamily: "Overpass",
										fontWeight: "bold",
										fontSize: h2FontSize,
										marginBottom: 0,
										lineHeight: 1
									}}
								>
									Online class alone
								</h2>
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
									src="https://user-images.githubusercontent.com/2585159/40999312-1c66c9ea-68d0-11e8-9528-4fe4123070d3.png"
								/>
							</Col>
						</Row>
					</Col>
					<Col
						style={{
							padding: h2Padding
						}}
						xs={{ span: 24 }}
						sm={{ span: 11 }}
						md={{ span: 12 }}
						lg={{ span: 11 }}
						xl={{ span: 7 }}
					>
						<Row type="flex" justify="center">
							<Col>
								<h2
									style={{
										textAlign: "center",
										color: GREY_2,
										fontFamily: "Overpass",
										fontWeight: "bold",
										fontSize: h2FontSize,
										marginBottom: 0,
										lineHeight: 1
									}}
								>
									Online class through infinity2o
								</h2>
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
									src="https://user-images.githubusercontent.com/2585159/40999319-20ee0d16-68d0-11e8-900a-0c239b422906.png"
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
		let h1FontSize = 42;
		if (windowWidth < 768) {
			h1Padding = "120px 0px 0px 0px";
			h1FontSize = 28;
			endColumnHeight = "60px";
		}

		return (
			<div>
				<Row
					type="flex"
					justify="center"
					style={{ padding: h1Padding }}
				>
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
							Meet people with similar beliefs to take online
							courses with.
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
