import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as indexActions from '../actions/index';
import { bindActionCreators } from 'redux';

import CustomHeader from './CustomHeader';
import Landing from './Landing';

// import Dashboard from './Dashboard';
// import SurveyNew from './surveys/SurveyNew';

import { Layout } from 'antd';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		console.log('this.props inside App', this.props);
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
	const appDispatchers = bindActionCreators(indexActions, dispatch);

	return {
		fetchUser: () => {
			appDispatchers.fetchUser();
		}
	};
}

export default connect(null, mapDispatchToProps)(App);
