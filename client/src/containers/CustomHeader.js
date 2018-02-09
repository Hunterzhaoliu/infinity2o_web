import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as colorThemeActions from '../actions/colorTheme';

import { Layout, Row, Col, Button, Icon } from 'antd';
const { Header } = Layout;

class CustomHeader extends Component {
	renderHeaderButtons() {
		const loginState = this.props.auth.userInfo;
		switch (loginState) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				return (
					<div>
						<Row type="flex" justify="start">
							<Col key="0">
								<Button
									style={{
										borderColor: this.props.colorTheme
											.text8Color,
										background: this.props.colorTheme
											.text8Color,
										color: this.props.colorTheme.text5Color
									}}
									onClick={this.props.onPressRandomColorTheme}
								>
									Change Theme
								</Button>
							</Col>
						</Row>
					</div>
				);
			default:
				return (
					<div>
						<Row type="flex" justify="space-between">
							<Col
								sm={{ span: 7 }}
								md={{ span: 5 }}
								lg={{ span: 4 }}
								xl={{ span: 3 }}
								key="0"
							>
								<Button
									style={{
										borderColor: this.props.colorTheme
											.text6Color,
										background: this.props.colorTheme
											.text6Color,
										color: this.props.colorTheme.text2Color
									}}
									onClick={this.props.onPressRandomColorTheme}
								>
									Change Theme
								</Button>
							</Col>
							<Col
								sm={{ span: 5, offset: 0 }}
								md={{ span: 3, offset: 0 }}
								lg={{ span: 3, offset: 0 }}
								xl={{ span: 2, offset: 0 }}
								key="1"
							>
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
										<div>
											Profile <Icon type="profile" />
										</div>
									</Link>
								</Button>
							</Col>
							<Col
								sm={{ span: 5, offset: 0 }}
								md={{ span: 4, offset: 1 }}
								lg={{ span: 3, offset: 0 }}
								xl={{ span: 3, offset: 0 }}
								key="2"
							>
								<Button
									style={{
										borderColor: this.props.colorTheme.key,
										background: this.props.colorTheme.key,
										color: this.props.colorTheme.text1Color
									}}
								>
									<Link to="/dashboard/matches">
										<div>
											Matches{' '}
											<Icon type="usergroup-add" />
										</div>
									</Link>
								</Button>
							</Col>
							<Col
								sm={{ span: 5, offset: 2 }}
								md={{ span: 3, offset: 7 }}
								lg={{ span: 3, offset: 11 }}
								xl={{ span: 2, offset: 14 }}
								key="4"
							>
								<Button
									style={{
										borderColor: this.props.colorTheme
											.thirdColor,
										background: this.props.colorTheme
											.thirdColor,
										color: this.props.colorTheme.text2Color
									}}
								>
									<a href="/api/logout">
										Logout <Icon type="logout" />
									</a>
								</Button>
							</Col>
						</Row>
					</div>
				);
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
				{this.renderHeaderButtons()}
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
