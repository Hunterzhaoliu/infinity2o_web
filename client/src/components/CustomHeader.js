import { GREY_1, GREY_9 } from './styles/ColorConstants';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col } from 'antd';
import { Layout } from 'antd';
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
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				];
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
					<Col span={4}>
						<Link to={this.renderLogoRedirect()}>
							<p style={styles.text}>infinity2o</p>
						</Link>
					</Col>
					<Col span={4} offset={16}>
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
		background: GREY_9,
		position: 'fixed',
		width: '100%'
	},
	text: {
		background: GREY_1
	}
};

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(CustomHeader);
