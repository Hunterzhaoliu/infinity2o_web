import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as colorThemeActions from '../actions/colorTheme';

import { Layout, Row, Col, Button, Icon } from 'antd';
const { Header } = Layout;

class CustomHeader extends Component {
	renderChangeThemeButton() {
		const { colorTheme, onPressRandomColorTheme } = this.props;
		return (
			<div>
				<Button
					style={{
						borderColor: colorTheme.text7Color,
						background: colorTheme.text7Color,
						color: colorTheme.text4Color
					}}
					onClick={onPressRandomColorTheme}
				>
					Change Theme
				</Button>
			</div>
		);
	}

	renderHeaderButtons() {
		const {
			colorTheme,
			onPressRandomColorTheme,
			onPressProfile,
			onPressTrainAI,
			onPressMatches,
			onPressConversations,
			auth
		} = this.props;
		switch (auth.loggedInState) {
			case 'not_logged_in':
				return (
					<div>
						<Row type="flex" justify="start">
							<Col key="0">{this.renderChangeThemeButton()}</Col>
						</Row>
					</div>
				);
			case 'logged_in':
				return (
					<div>
						<Row type="flex" justify="space-between">
							<Col md={{ span: 4 }} xl={{ span: 3 }} key="0">
								<Button
									style={{
										borderColor: colorTheme.text7Color,
										background: colorTheme.text7Color,
										color: colorTheme.text4Color
									}}
									onClick={onPressRandomColorTheme}
								>
									Change Theme
								</Button>
							</Col>
							<Col
								md={{ span: 2, offset: 1 }}
								xl={{ span: 2, offset: 0 }}
								key="1"
							>
								<Button
									style={{
										borderColor:
											colorTheme.profileButtonColor,
										background:
											colorTheme.profileButtonColor,
										color: colorTheme.profileButtonTextColor
									}}
									onClick={onPressProfile}
								>
									<Link to="/profile">
										<div>Profile</div>
									</Link>
								</Button>
							</Col>
							<Col
								md={{ span: 3, offset: 1 }}
								xl={{ span: 2, offset: 0 }}
								key="2"
							>
								<Button
									style={{
										borderColor:
											colorTheme.trainAIButtonColor,
										background:
											colorTheme.trainAIButtonColor,
										color: colorTheme.trainAIButtonTextColor
									}}
									onClick={onPressTrainAI}
								>
									<Link to="/train_ai">
										<div>Train AI</div>
									</Link>
								</Button>
							</Col>
							<Col
								md={{ span: 3, offset: 1 }}
								xl={{ span: 2, offset: 0 }}
								key="3"
							>
								<Button
									style={{
										borderColor:
											colorTheme.matchesButtonColor,
										background:
											colorTheme.matchesButtonColor,
										color: colorTheme.matchesButtonTextColor
									}}
									onClick={onPressMatches}
								>
									<Link to="/matches">
										<div>Matches</div>
									</Link>
								</Button>
							</Col>
							<Col
								md={{ span: 1, offset: 1 }}
								xl={{ span: 1, offset: 0 }}
								key="4"
							>
								<Button
									style={{
										borderColor:
											colorTheme.conversationsButtonColor,
										background:
											colorTheme.conversationsButtonColor,
										color:
											colorTheme.conversationsButtonTextColor
									}}
									onClick={onPressConversations}
								>
									<Link to="/conversations">
										<div>
											<Icon type="message" />
										</div>
									</Link>
								</Button>
							</Col>
							<Col
								md={{ span: 3, offset: 4 }}
								xl={{ span: 2, offset: 12 }}
								key="5"
							>
								<Button
									style={{
										borderColor: colorTheme.text7Color,
										background: colorTheme.text7Color,
										color: colorTheme.text4Color
									}}
								>
									<a href="/api/logout">Logout</a>
								</Button>
							</Col>
						</Row>
					</div>
				);
			default:
				console.log(
					'ERROR: site in invalid state = ',
					auth.loggedInState
				);
		}
	}

	render() {
		const { colorTheme } = this.props;
		return (
			<Header
				style={{
					background: colorTheme.text8Color,
					position: 'fixed',
					zIndex: 1, // make every display under the header
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
		},
		onPressProfile: () => {
			customHeaderDispatchers.onProfile();
		},
		onPressTrainAI: () => {
			customHeaderDispatchers.onTrainAI();
		},
		onPressMatches: () => {
			customHeaderDispatchers.onMatches();
		},
		onPressConversations: () => {
			customHeaderDispatchers.onPressConversations();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
