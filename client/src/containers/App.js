import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActionCreators from '../actions/auth';
import { bindActionCreators } from 'redux';

import CustomSider from './landing/CustomSider';
import CustomHeader from './landing/CustomHeader';
import Landing from './landing/Landing';
import Tour from './help/Tour';
import Profile from './profile/Profile';
import ProfileEdit from './profile/edit/ProfileEdit';
import SortingHat from './sorting_hat/SortingHat';
import Ask from './sorting_hat/Ask';
import Matches from './matches/Matches';
import Conversations from './conversations/Conversations';
import CustomFooter from './landing/CustomFooter';

import { Layout } from 'antd';

class App extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.initializeApp();
	}

	render() {
		return (
			<BrowserRouter>
				<Layout>
					<CustomSider />
					<Layout style={{ height: '100vh' }}>
						<CustomHeader />
						<Route exact={true} path="/" component={Landing} />
						<Route exact={true} path="/tour" component={Tour} />
						<Route
							exact={true}
							path="/profile"
							component={Profile}
						/>
						<Route
							exact={true}
							path="/profile/edit"
							component={ProfileEdit}
						/>
						<Route
							exact={true}
							path="/sorting_hat"
							component={SortingHat}
						/>
						<Route
							exact={true}
							path="/sorting_hat/ask"
							component={Ask}
						/>
						<Route
							exact={true}
							path="/matches"
							component={Matches}
						/>
						<Route
							exact={true}
							path="/conversations"
							component={Conversations}
						/>
						<CustomFooter />
					</Layout>
				</Layout>
			</BrowserRouter>
		);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const authDispatchers = bindActionCreators(authActionCreators, dispatch);

	return {
		initializeApp: () => {
			authDispatchers.initializeApp();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
