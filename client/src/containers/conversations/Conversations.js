import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout } from 'antd';
const { Content } = Layout;

class Conversations extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onPressConversations();
	}

	render() {
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			/>
		);
	}
}

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
	const colorThemeDispatchers = bindActionCreators(
		colorThemeActionCreators,
		dispatch
	);

	return {
		onPressConversations: () => {
			colorThemeDispatchers.onPressConversations();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
