import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as indexActionCreators from '../actions/index';
import * as colorThemeActionCreators from '../actions/colorTheme';
import { bindActionCreators } from 'redux';

import CustomHeader from './CustomHeader';
import Landing from './Landing';
import Questions from './questions/Questions';
import AskForm from './questions/AskForm';

import { Layout } from 'antd';

class App extends Component {
	componentDidMount() {
		this.props.asyncFetchUser();
		// set random color theme on initial login
		this.props.generateRandomColorTheme();
	}

	render() {
		console.log('this.props inside App', this.props);
		return (
			<BrowserRouter>
				<Layout style={styles.layout}>
					<CustomHeader />
					<Route exact={true} path="/" component={Landing} />
					<Route
						exact={true}
						path="/questions"
						component={Questions}
					/>
					<Route
						exact={true}
						path="/questions/ask"
						component={AskForm}
					/>
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
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const indexDispatchers = bindActionCreators(indexActionCreators, dispatch);

	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		asyncFetchUser: () => {
			indexDispatchers.asyncFetchUser();
		},
		generateRandomColorTheme: () => {
			colorThemeDispatchers.generateRandomColorTheme();
		}
	};
}

export default connect(null, mapDispatchToProps)(App);
