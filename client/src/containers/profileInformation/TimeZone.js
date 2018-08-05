import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import DisplayField from "../profile/DisplayField";

class TimeZone extends Component {
	render() {
		const { value, activeSection } = this.props;
		if (value !== null && value.length > 0) {
			let padding = "5px 0px 0px 20px";
			if (activeSection === "matches") {
				padding = "5px 0px 0px 40px";
			}
			return (
				<Row type="flex" justify="start" align="middle">
					<Col span={1}>
						<img
							alt="Time Zone: "
							style={{
								width: "42px",
								padding: "0px 0px 0px 5px"
							}}
							src="https://user-images.githubusercontent.com/24757872/40868790-25f907ea-65d6-11e8-8dd1-2f3a79076082.png"
						/>
					</Col>
					<Col
						span={23}
						style={{
							padding: padding // top right bottom left
						}}
					>
						<DisplayField label="Time Zone: " value={value[1]} />
					</Col>
				</Row>
			);
		} else {
			return <div />;
		}
	}
}
/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		activeSection: state.colorTheme.activeSection
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeZone);
