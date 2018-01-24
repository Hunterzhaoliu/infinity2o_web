import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	renderContent() {
		console.log('before stateOfUser', stateOfUser);
		let stateOfUser = this.props.auth;
		if (stateOfUser) {
			stateOfUser = this.props.auth.data;
		}
		console.log('after stateOfUser', stateOfUser);
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
						<Payments />
					</li>,
					<li key="2" style={{ margin: '0 10px' }}>
						Credits: {stateOfUser.credits}
					</li>,
					<li key="3">
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
