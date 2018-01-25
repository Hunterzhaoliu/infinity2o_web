import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col } from 'antd';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

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
			<Header style={{ position: 'fixed', width: '100%' }}>
				<Row>
					<Col span={8}>
						<Link to={this.renderLogoRedirect()} className="left">
							infinity2o
						</Link>
					</Col>
					<Col span={8} offset={8}>
						<ul className="right">{this.renderContent()}</ul>
					</Col>
				</Row>
			</Header>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(CustomHeader);
