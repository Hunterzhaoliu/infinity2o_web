import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GREY_1, GREY_2, GREY_3, GREY_4 } from '../styles/ColorConstants';
import { Layout, Row, Col, Button } from 'antd';
const { Footer } = Layout;

class CustomFooter extends Component {
	render() {
		const { colorTheme, loggedInState } = this.props;

		let backgroundColor = this.props.colorTheme.backgroundColor;
		let textColor = this.props.colorTheme.text7Color;
		let aboutButtonColor = this.props.colorTheme.text8Color;
		let textColor2 = this.props.colorTheme.text6Color;
		if (loggedInState === 'not_logged_in') {
			backgroundColor = GREY_1;
			textColor = GREY_3;
			aboutButtonColor = GREY_2;
			textColor2 = GREY_4;
		}

		if (colorTheme.activeSection === 'conversations') {
			return <div />;
		} else {
			return (
				<Footer
					style={{
						textAlign: 'center',
						background: backgroundColor,
						color: textColor
					}}
				>
					<Row type="flex" justify="center">
						<Col>
							<p
								style={{
									color: textColor
								}}
							>
								Feedback? askinfinity2o@gmail.com
							</p>
						</Col>
						<Col
							style={{
								padding: '0px 0px 0px 10px'
							}}
						>
							<Button
								style={{
									borderColor: aboutButtonColor,
									background: aboutButtonColor
								}}
								size={'small'}
							>
								<a
									style={{
										color: textColor2
									}}
									href="/about"
								>
									About
								</a>
							</Button>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col span={24}>
							<p style={{ color: textColor }}>
								Infinity2o © 2018 -> ∞
							</p>
						</Col>
					</Row>
				</Footer>
			);
		}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomFooter);
