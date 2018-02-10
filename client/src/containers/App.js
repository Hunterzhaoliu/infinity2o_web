import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as indexActionCreators from '../actions/index';
import * as colorThemeActionCreators from '../actions/colorTheme';
import { bindActionCreators } from 'redux';

import CustomHeader from './CustomHeader';
import Landing from './Landing';
import Dashboard from './dashboard/Dashboard';
import Matches from './dashboard/matches/Matches';
import Edit from './dashboard/profile/Edit';

import { Layout } from 'antd';
const { Footer } = Layout;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
		// set random color theme on initial login
		this.props.generateRandomColorTheme();
	}

	render() {
		//console.log('this.props inside App', this.props);
		return (
			<BrowserRouter>
				<Layout style={styles.layout}>
					<CustomHeader />
					<Route exact={true} path="/" component={Landing} />
					<Route exact={true} path="/profile" component={Dashboard} />
					<Route exact={true} path="/profile/edit" component={Edit} />
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
		colorTheme: state.colorTheme
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
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
