import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Icon } from "antd";

class LinkedIn extends Component {
	render() {
		const { value } = this.props;
		if (value !== undefined && value !== null) {
			return (
				<Col>
					<a href={value} target="_blank">
						<Icon
							alt="LinkedIn: "
							style={{
								fontSize: "25px",
								color: "rgb(13, 142, 255)"
							}}
							type="linkedin"
						/>
					</a>
				</Col>
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
	return {};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedIn);
