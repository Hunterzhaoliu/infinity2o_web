import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as indexActionCreators from '../actions/index';
import * as colorThemeActionCreators from '../actions/colorTheme';
import { bindActionCreators } from 'redux';

import CustomHeader from './CustomHeader';
import Landing from './Landing';
import Profile from './profile/Profile';
import ProfileEdit from './profile/ProfileEdit';

import Matches from './matches/Matches';

import { Layout } from 'antd';
const { Footer } = Layout;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		//console.log('this.props inside App', this.props);

		const { auth, profile } = this.props;
		const loggedIn = auth.loggedIn;
		const hasProfile = profile.name !== undefined && profile.name !== null;
		console.log('this.props = ', this.props);
		if (!loggedIn) {
			console.log('user not logged in');
			//this.props.fetchUser();
			//this.props.generateRandomColorTheme();
		} else if (loggedIn && !hasProfile) {
			console.log('user logged in & has no profile');
			//this.props.onProfile();
		} else if (loggedIn && hasProfile) {
			console.log('user logged in & has profile');
			//this.props.onTrainAI();
		}
		return (
			<BrowserRouter>
				<Layout style={styles.layout}>
					<CustomHeader />
					<Route exact={true} path="/" component={Landing} />
					<Route exact={true} path="/profile" component={Profile} />
					<Route
						exact={true}
						path="/profile/edit"
						component={ProfileEdit}
					/>
					<Route exact={true} path="/matches" component={Matches} />
					<Footer
						style={{
							textAlign: 'center',
							background: this.props.colorTheme.backgroundColor,
							color: this.props.colorTheme.text7Color
						}}
					>
						<p>Infinity2o Inc. © 2018 to year infinity</p>
						<p>UI v0.2.0 | API v1.0.0</p>
					</Footer>
				</Layout>
			</BrowserRouter>
		);
	}
}

var styles = {
	layout: {
		height: '100vh'
	}
};

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		auth: state.auth,
		profile: state.profile
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const indexDispatchers = bindActionCreators(indexActionCreators, dispatch);

	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		fetchUser: () => {
			indexDispatchers.fetchUser();
		},
		generateRandomColorTheme: () => {
			colorThemeDispatchers.generateRandomColorTheme();
		},
		onProfile: () => {
			colorThemeDispatchers.onProfile();
		},
		onTrainAI: () => {
			colorThemeDispatchers.onTrainAI();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
