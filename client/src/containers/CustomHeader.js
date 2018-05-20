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

	renderSaveIcon(saveState) {
		if (saveState === 'save_start') {
			return <Icon type="loading" />;
		} else if (saveState === 'save_done') {
			return;
		} else if (saveState === 'save_error') {
			return <Icon type="warning" />;
		}
	}

	renderChangeThemeButton() {
		const {
			colorTheme,
			onRandomColorTheme,
			loggedInState,
			nonLoggedInGenerateRandomColorTheme,
			colorThemeSave
		} = this.props;
		if (loggedInState === 'not_logged_in') {
			return (
				<Button
					style={{
						borderColor: colorTheme.text7Color,
						background: colorTheme.text7Color,
						color: colorTheme.text4Color
					}}
					onClick={nonLoggedInGenerateRandomColorTheme}
				>
					Change Theme
				</Button>
			);
		} else if (loggedInState === 'logged_in') {
			return (
				<Button
					style={{
						borderColor: colorTheme.text7Color,
						background: colorTheme.text7Color,
						color: colorTheme.text4Color
					}}
					onClick={onRandomColorTheme}
				>
					Change Theme
					{this.renderSaveIcon(colorThemeSave)}
				</Button>
			);
		}
	}

	renderTourButton() {
		const { colorTheme, onTour } = this.props;

		return (
			<Button
				style={{
					fontSize: 17,
					borderColor: colorTheme.tourButtonColor,
					background: colorTheme.tourButtonColor,
					color: colorTheme.tourButtonTextColor
				}}
				onClick={onTour}
			>
				<Link to="/tour">
					<Icon type="question-circle-o" />
				</Link>
			</Button>
		);
	}

	renderProfileButton() {
		const {
			colorTheme,
			onProfile,
			neuronsInBillions,
			infinityStatus
		} = this.props;
		let shortNeuronsInBillions;
		if (neuronsInBillions !== undefined) {
			shortNeuronsInBillions = neuronsInBillions.toFixed(1);
		}
		let displayText = ' ' + shortNeuronsInBillions + ' B';
		if (infinityStatus) {
			displayText = ' ∞';
		}
		return (
			<Button
				style={{
					borderColor: colorTheme.profileButtonColor,
					background: colorTheme.profileButtonColor,
					color: colorTheme.profileButtonTextColor
				}}
				onClick={onProfile}
			>
				<Link to="/profile">
					<div>
						<Icon style={{ fontSize: 17 }} type="user" />
						{displayText}
					</div>
				</Link>
			</Button>
		);
	}

	renderTrainAIButton() {
		const { colorTheme, onTrainAI } = this.props;

		return (
			<Button
				style={{
					borderColor: colorTheme.trainAIButtonColor,
					background: colorTheme.trainAIButtonColor,
					color: colorTheme.trainAIButtonTextColor
				}}
				onClick={onTrainAI}
			>
				<Link to="/train_ai">
					<div>Sorting Hat</div>
				</Link>
			</Button>
		);
	}

	renderMatchesButton() {
		const { colorTheme, onMatches } = this.props;

		return (
			<Button
				style={{
					borderColor: colorTheme.matchesButtonColor,
					background: colorTheme.matchesButtonColor,
					color: colorTheme.matchesButtonTextColor
				}}
				onClick={onMatches}
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
					fontSize: 17,
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
					<Menu.Item key="2">{this.renderTourButton()}</Menu.Item>
					<Menu.Item key="3">{this.renderProfileButton()}</Menu.Item>
					<Menu.Item key="4">{this.renderTrainAIButton()}</Menu.Item>
					<Menu.Item key="5">{this.renderMatchesButton()}</Menu.Item>
					<Menu.Item key="6">
						{this.renderConversationsButton()}
					</Menu.Item>
					<Menu.Item key="7">{this.renderLogoutButton()}</Menu.Item>
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
											color: colorTheme.keyText6Color
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
								md={{ span: 21, offset: 0 }}
								lg={{ span: 18, offset: 0 }}
								xl={{ span: 14, offset: 0 }}
							>
								<Row type="flex" justify="space-between">
									<Col
										md={{ span: 5 }}
										lg={{ span: 4 }}
										xl={{ span: 4 }}
										key="0"
									>
										{this.renderChangeThemeButton()}
									</Col>
									<Col
										md={{ span: 2, offset: 0 }}
										lg={{ span: 1, offset: 0 }}
										xl={{ span: 1, offset: 0 }}
										key="-1"
									>
										{this.renderTourButton()}
									</Col>
									<Col
										md={{ span: 3, offset: 0 }}
										lg={{ span: 2, offset: 0 }}
										xl={{ span: 2, offset: 0 }}
										key="1"
									>
										{this.renderProfileButton()}
									</Col>
									<Col
										md={{ span: 4, offset: 0 }}
										lg={{ span: 3, offset: 0 }}
										xl={{ span: 3, offset: 0 }}
										key="2"
									>
										{this.renderTrainAIButton()}
									</Col>
									<Col
										md={{ span: 3, offset: 0 }}
										lg={{ span: 2, offset: 0 }}
										xl={{ span: 2, offset: 0 }}
										key="3"
									>
										{this.renderMatchesButton()}
									</Col>
									<Col
										md={{ span: 3, offset: 0 }}
										lg={{ span: 1, offset: 0 }}
										xl={{ span: 1, offset: 0 }}
										key="4"
									>
										{this.renderConversationsButton()}
									</Col>
								</Row>
							</Col>
							<Col
								md={{ span: 3 }}
								lg={{ span: 2 }}
								xl={{ span: 2 }}
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
		const { colorTheme, auth } = this.props;
		let headerBackground;
		switch (auth.loggedInState) {
			case 'not_logged_in':
				headerBackground = colorTheme.backgroundColor;
				break;
			case 'logged_in':
				headerBackground = colorTheme.text8Color;
				break;
			default:
		}
		return (
			<Header
				style={{
					background: headerBackground,
					position: 'fixed',
					zIndex: 1, // make every component display under the header
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
		windowWidth: state.customHeader.windowWidth,
		loggedInState: state.auth.loggedInState,
		colorThemeSave: state.profile.colorThemeSave
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
		onRandomColorTheme: () => {
			colorThemeDispatchers.generateRandomColorTheme();
		},
		nonLoggedInGenerateRandomColorTheme: () => {
			colorThemeDispatchers.nonLoggedInGenerateRandomColorTheme();
		},
		onProfile: () => {
			colorThemeDispatchers.onProfile();
		},
		onTrainAI: () => {
			colorThemeDispatchers.onTrainAI();
		},
		onMatches: () => {
			colorThemeDispatchers.onMatches();
		},
		onPressConversations: () => {
			colorThemeDispatchers.onConversations();
		},
		onTour: () => {
			colorThemeDispatchers.onTour();
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
