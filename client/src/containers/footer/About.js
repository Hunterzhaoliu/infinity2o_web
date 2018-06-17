import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GREY_1, GREY_9 } from '../styles/ColorConstants';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class About extends Component {
	render() {
		const { colorTheme, loggedInState } = this.props;

		let background = colorTheme.backgroundColor;
		let textColor = colorTheme.text1Color;
		if (loggedInState === 'not_logged_in') {
			background = GREY_1;
			textColor = GREY_9;
		}

		return (
			<Content
				style={{
					padding: '75px 50px 0px', // top right bottom left
					background: background
				}}
			>
				<Row type="flex" justify="center">
					<Col>
						<h1 style={{ color: textColor }}>Team</h1>
					</Col>
				</Row>
			</Content>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		loggedInState: state.auth.loggedInState
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
