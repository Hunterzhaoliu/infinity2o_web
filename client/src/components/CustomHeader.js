import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as colorThemeActions from '../actions/colorTheme';

import { Layout, Row, Col, Button } from 'antd';
const { Header } = Layout;

class CustomHeader extends Component {
	renderLogout() {
		switch (this.props.auth.userInfo) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				return;
			default:
				return [
					<Row type="flex" key="1">
						<Col span={8}>
							<Button
								style={{
									borderColor: this.props.colorTheme.keyColor,
									background: this.props.colorTheme.keyColor,
									color: this.props.colorTheme.text1Color
								}}
							>
								<Link to="/questions/ask">
									<div>Ask Research Question</div>
								</Link>
							</Button>
						</Col>
					</Row>,
					<Row type="flex" key="2">
						<Col span={6}>
							<Button
								style={{
									borderColor: this.props.colorTheme
										.thirdColor,
									background: this.props.colorTheme
										.thirdColor,
									color: this.props.colorTheme.text2Color
								}}
							>
								<a href="/api/logout">Logout</a>
							</Button>
						</Col>
					</Row>
				];
		}
	}

	render() {
		return (
			<Header
				style={{
					background: this.props.colorTheme.keyComplimentColor,
					position: 'fixed',
					width: '100%'
				}}
			>
				<Row type="flex" justify="space-between">
					<Row type="flex" justify="start">
						<Col span={8}>
							<Button
								style={{
									borderColor: this.props.colorTheme
										.thirdColor,
									background: this.props.colorTheme
										.thirdColor,
									color: this.props.colorTheme.text2Color
								}}
								onClick={this.props.onPressRandomColorTheme}
							>
								Change Theme
							</Button>
						</Col>
					</Row>
					{this.renderLogout()}
				</Row>
			</Header>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		auth: state.auth,
		colorTheme: state.colorTheme
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const customHeaderDispatchers = bindActionCreators(
		colorThemeActions,
		dispatch
	);

	return {
		onPressRandomColorTheme: () => {
			customHeaderDispatchers.generateRandomColorTheme();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
