import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../actions/colorTheme';
import * as authActionCreators from '../actions/auth';
import * as customHeaderActionCreators from '../actions/customHeader';

import { Layout, Row, Col, Button, Icon, Dropdown, Menu } from 'antd';
const { Header } = Layout;

class CustomHeader extends Component {
	constructor(props) {
		super(props);
		this.props.fetchUserProfile(); // to show correct neuron number
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.props.updateWindowWidth(window.innerWidth);
	}

	renderChangeThemeButton() {
		const { colorTheme, onPressRandomColorTheme } = this.props;
		return (
			<Button
				style={{
					borderColor: colorTheme.text7Color,
					background: colorTheme.text7Color,
					color: colorTheme.text2Color
				}}
				onClick={onPressRandomColorTheme}
			>
				Change Theme
			</Button>
		);
	}

	renderProfileButton() {
		const {
			colorTheme,
			onPressProfile,
			neuronsInBillions,
			infinityStatus
		} = this.props;
		let shortNeuronsInBillions;
		if (neuronsInBillions !== undefined) {
			shortNeuronsInBillions = neuronsInBillions.toFixed(1);
		}
		let displayText = 'Profile ' + shortNeuronsInBillions + ' B';
		if (infinityStatus) {
			displayText = 'Profile ∞';
		}
		return (
			<Button
				style={{
					borderColor: colorTheme.profileButtonColor,
					background: colorTheme.profileButtonColor,
					color: colorTheme.profileButtonTextColor
				}}
				onClick={onPressProfile}
			>
				<Link to="/profile">
					<div>{displayText}</div>
				</Link>
			</Button>
		);
	}

	renderTrainAIButton() {
		const { colorTheme, onPressTrainAI } = this.props;

		return (
			<Button
				style={{
					borderColor: colorTheme.trainAIButtonColor,
					background: colorTheme.trainAIButtonColor,
					color: colorTheme.trainAIButtonTextColor
				}}
				onClick={onPressTrainAI}
			>
				<Link to="/train_ai">
					<div>Train AI</div>
				</Link>
			</Button>
		);
	}

	renderMatchesButton() {
		const { colorTheme, onPressMatches } = this.props;

		return (
			<Button
				style={{
					borderColor: colorTheme.matchesButtonColor,
					background: colorTheme.matchesButtonColor,
					color: colorTheme.matchesButtonTextColor
				}}
				onClick={onPressMatches}
			>
				<Link to="/matches">
					<div>Matches</div>
				</Link>
			</Button>
		);
	}

	renderLogoutButton() {
		const { colorTheme } = this.props;

		return (
			<Button
				style={{
					borderColor: colorTheme.text7Color,
					background: colorTheme.text7Color,
					color: colorTheme.text4Color
				}}
			>
				<a href="/api/logout">Logout</a>
			</Button>
		);
	}

	renderConversationsButton() {
		const { colorTheme, onPressConversations } = this.props;

		return (
			<Button
				style={{
					borderColor: colorTheme.conversationsButtonColor,
					background: colorTheme.conversationsButtonColor,
					color: colorTheme.conversationsButtonTextColor
				}}
				onClick={onPressConversations}
			>
				<Link to="/conversations">
					<div>
						<Icon type="message" />
					</div>
				</Link>
			</Button>
		);
	}

	renderHeaderButtons() {
		const { colorTheme, auth, windowWidth } = this.props;

		if (windowWidth < 768) {
			// show a dropdown with buttons instead of nav bar
			const menu = (
				<Menu
					style={{
						borderColor: colorTheme.text6Color,
						background: colorTheme.text6Color,
						color: colorTheme.text1Color
					}}
				>
					<Menu.Item key="1">
						{this.renderChangeThemeButton()}
					</Menu.Item>
					<Menu.Item key="2">{this.renderProfileButton()}</Menu.Item>
					<Menu.Item key="3">{this.renderTrainAIButton()}</Menu.Item>
					<Menu.Item key="4">{this.renderMatchesButton()}</Menu.Item>
					<Menu.Item key="5">
						{this.renderConversationsButton()}
					</Menu.Item>
					<Menu.Item key="6">{this.renderLogoutButton()}</Menu.Item>
				</Menu>
			);

			return (
				<Row type="flex" justify="start">
					<Col key="0">
						<Button
							style={{
								borderColor: colorTheme.text7Color,
								background: colorTheme.text7Color,
								color: colorTheme.text2Color
							}}
						>
							<Dropdown overlay={menu} trigger={['click']}>
								<a className="ant-dropdown-link">
									Options{' '}
									<Icon
										style={{
											fontSize: 16,
											color: colorTheme.keyText2Color
										}}
										type="down-circle"
									/>
								</a>
							</Dropdown>
						</Button>
					</Col>
				</Row>
			);
		}

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
							<Col
								md={{ span: 5 }}
								lg={{ span: 4 }}
								xl={{ span: 5 }}
								key="0"
							>
								{this.renderChangeThemeButton()}
							</Col>
							<Col
								md={{ span: 4, offset: 0 }}
								lg={{ span: 3, offset: 0 }}
								xl={{ span: 3, offset: 0 }}
								key="1"
							>
								{this.renderProfileButton()}
							</Col>
							<Col
								md={{ span: 3, offset: 1 }}
								lg={{ span: 2, offset: 1 }}
								xl={{ span: 2, offset: 0 }}
								key="2"
							>
								{this.renderTrainAIButton()}
							</Col>
							<Col
								md={{ span: 3, offset: 1 }}
								lg={{ span: 2, offset: 1 }}
								xl={{ span: 2, offset: 0 }}
								key="3"
							>
								{this.renderMatchesButton()}
							</Col>
							<Col
								md={{ span: 2, offset: 1 }}
								lg={{ span: 1, offset: 1 }}
								xl={{ span: 1, offset: 0 }}
								key="4"
							>
								{this.renderConversationsButton()}
							</Col>
							<Col
								md={{ span: 3, offset: 1 }}
								lg={{ span: 2, offset: 7 }}
								xl={{ span: 2, offset: 8 }}
								key="5"
							>
								{this.renderLogoutButton()}
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
		colorTheme: state.colorTheme,
		neuronsInBillions: state.profile.payment.neuronsInBillions,
		infinityStatus: state.profile.payment.infinityStatus,
		windowWidth: state.customHeader.windowWidth
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);
	const authDispatchers = bindActionCreators(authActionCreators, dispatch);
	const customHeaderDispatchers = bindActionCreators(
		customHeaderActionCreators,
		dispatch
	);
	return {
		onPressRandomColorTheme: () => {
			colorThemeDispatchers.generateRandomColorTheme();
		},
		onPressProfile: () => {
			colorThemeDispatchers.onProfile();
		},
		onPressTrainAI: () => {
			colorThemeDispatchers.onTrainAI();
		},
		onPressMatches: () => {
			colorThemeDispatchers.onMatches();
		},
		onPressConversations: () => {
			colorThemeDispatchers.onPressConversations();
		},
		fetchUserProfile: () => {
			authDispatchers.fetchUserProfile();
		},
		updateWindowWidth: newWindowWidth => {
			customHeaderDispatchers.updateWindowWidth(newWindowWidth);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
