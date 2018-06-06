import React, { Component } from 'react';
// import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
const { Footer } = Layout;

class CustomFooter extends Component {
	render() {
		const { colorTheme, loggedInState } = this.props;

		if (
			colorTheme.activeSection === 'conversations' ||
			loggedInState === 'not_logged_in'
		) {
			return <div />;
		} else {
			return (
				<Footer
					style={{
						textAlign: 'center',
						background: this.props.colorTheme.backgroundColor,
						color: this.props.colorTheme.text7Color
					}}
				>
					<Row type="flex" justify="center">
						<Col
							sm={{ span: 12 }}
							md={{ span: 10 }}
							lg={{ span: 8 }}
							xl={{ span: 6 }}
						>
							<p
								style={{
									color: this.props.colorTheme.text6Color
								}}
							>
								Feedback? askinfinity2o@gmail.com
							</p>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<p>Infinity2o © 2018 -> ∞</p>
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
