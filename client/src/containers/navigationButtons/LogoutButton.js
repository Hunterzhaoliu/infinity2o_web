import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "antd";

class LogoutButton extends Component {
	render() {
		const { colorTheme } = this.props;

		return (
			<Col>
				<Button
					style={{
						borderColor: colorTheme.text7Color,
						background: colorTheme.text7Color,
						color: colorTheme.text4Color,
						padding: "0px 10px 0px"
					}}
				>
					<a href="/api/logout">
						<img
							alt=""
							style={{ width: 20 }}
							src="https://user-images.githubusercontent.com/24757872/40881894-17153326-6698-11e8-960e-0c08d872b139.png"
						/>
					</a>
				</Button>
			</Col>
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
)(LogoutButton);
