import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import CustomHeader from './CustomHeader';
// import Landing from './Landing';
// import Dashboard from './Dashboard';
// import SurveyNew from './surveys/SurveyNew';

import { Layout } from 'antd';
const { Content, Footer } = Layout;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Layout>
					<CustomHeader />
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<div
							style={{
								background: '#fff',
								padding: 24,
								minHeight: 880
							}}
						>
							Content
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Copyright © 2018 Infinity2o Inc. All rights reserved.
					</Footer>
				</Layout>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
