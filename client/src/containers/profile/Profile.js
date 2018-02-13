import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import FormEdit from './FormEdit';
const { Content } = Layout;

class Profile extends Component {
	render() {
		// console.log('this.props in Profile.js', this.props);
		return (
			<Content
				style={{
					padding: '10% 9% 5%', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<FormEdit />
			</Content>
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

export default connect(mapStateToProps, null)(Profile);
