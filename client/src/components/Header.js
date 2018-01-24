import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
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
					<li key="1">
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
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.renderLogoRedirect()}
						className="left brand-logo"
					>
						infinity2o
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

// function mapStateToProps({ auth }) {
// 	return { auth };
// }

export default connect(mapStateToProps)(Header);
