import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as colorThemeActions from '../actions/colorTheme';

import { Layout, Row, Col, Button } from 'antd';
const { Header } = Layout;

class CustomHeader extends Component {
	renderHeaderButtons() {
		const loginState = this.props.auth.userInfo;
		switch (loginState) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				return;
			default:
				return [
					<Col span={3} key="1">
						<Button
							style={{
								borderColor: this.props.colorTheme.key,
								background: this.props.colorTheme.key,
								color: this.props.colorTheme.text1Color
							}}
						>
							<Link to="/dashboard/matches">
								<div>Matches</div>
							</Link>
						</Button>
					</Col>,
					<Col span={13} key="2">
						<Button
							style={{
								borderColor: this.props.colorTheme
									.keyCompliment1,
								background: this.props.colorTheme
									.keyCompliment1,
								color: this.props.colorTheme.text1Color
							}}
						>
							<Link to="/dashboard/profile">
								<div>Profile</div>
							</Link>
						</Button>
					</Col>,
					<Col span={3} key="3">
						<Button
							style={{
								borderColor: this.props.colorTheme.thirdColor,
								background: this.props.colorTheme.thirdColor,
								color: this.props.colorTheme.text2Color
							}}
						>
							<a href="/api/logout">Logout</a>
						</Button>
					</Col>
				];
		}
	}

	render() {
		return (
			<Header
				style={{
					background: this.props.colorTheme.backgroundColor,
					position: 'fixed',
					width: '100%'
				}}
			>
				<Row type="flex" justify="space-between">
					<Col key="0" span={5}>
						<Button
							style={{
								borderColor: this.props.colorTheme.text5Color,
								background: this.props.colorTheme.text5Color,
								color: this.props.colorTheme.text1Color
							}}
							onClick={this.props.onPressRandomColorTheme}
						>
							Change Theme
						</Button>
					</Col>
					{this.renderHeaderButtons()}
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
