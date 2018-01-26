import * as colors from './styles/ColorConstants';

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
					<Row type="flex">
						<Col span={8}>
							<Button
								key="5"
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
					<Row type="flex">
						<Col span={6}>
							<Button
								key="5"
								style={{
									borderColor: this.props.colorTheme
										.keyComplimentColor,
									background: this.props.colorTheme
										.keyComplimentColor,
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
			<Header style={styles.header}>
				<Row type="flex" justify="space-between">
					<Row type="flex" justify="start">
						<Col span={8}>
							<Button
								style={{
									borderColor: this.props.colorTheme
										.buttonTextColor,
									background: this.props.colorTheme
										.buttonTextColor,
									color: colors.GREY_5
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

// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
	header: {
		background: colors.GREY_5,
		position: 'fixed',
		width: '100%'
	}
};

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
