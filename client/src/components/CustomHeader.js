import * as colors from './styles/ColorConstants';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Layout, Row, Col } from 'antd';
const { Header } = Layout;
const Radium = require('radium');

class CustomHeader extends Component {
	renderContent() {
		let stateOfUser = this.props.auth;
		if (stateOfUser) {
			stateOfUser = this.props.auth.data;
		}
		switch (stateOfUser) {
			case null:
				// show nothing when still signing in
				return;
			case '':
				return (
					<a href="/auth/google" style={styles.text}>
						<p style={styles.text1}>Google Login</p>
					</a>
				);
			default:
				return (
					<a href="/api/logout" style={styles.text1}>
						Logout
					</a>
				);
		}
	}

	renderLogoRedirect() {
		let stateOfUser = this.props.auth;
		if (stateOfUser) {
			stateOfUser = this.props.auth.data;
		}
		if (stateOfUser === '' || stateOfUser == null) {
			// not logged in
			return '/';
		} else {
			return '/surveys';
		}
	}

	render() {
		return (
			<Header style={styles.header}>
				<Row type="flex">
					<Col span={12}>
						<Link to={this.renderLogoRedirect()}>
							<p style={styles.text2}>infinity2o</p>
						</Link>
					</Col>
					<Col span={12}>
						<ul>{this.renderContent()}</ul>
					</Col>
				</Row>
			</Header>
		);
	}
}

CustomHeader = Radium(CustomHeader);

// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
	header: {
		background: colors.GREY_5,
		position: 'fixed',
		width: '100%'
	},
	text1: {
		color: colors.GREY_1
	},
	text2: {
		color: colors.GREY_2
	}
};

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(CustomHeader);
