import * as colors from './styles/ColorConstants';

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CustomHeader from './CustomHeader';
import Landing from './Landing';

// import Dashboard from './Dashboard';
// import SurveyNew from './surveys/SurveyNew';

import { Layout } from 'antd';
const Radium = require('radium');

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Layout style={styles.layout}>
					<CustomHeader />
					<Landing />
				</Layout>
			</BrowserRouter>
		);
	}
}

App = Radium(App);
var styles = {
	layout: {
		height: '100vh'
	}
};

export default connect(null, actions)(App);
