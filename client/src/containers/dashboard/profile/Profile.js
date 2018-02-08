import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import ProfileForm from './ProfileForm';
const { Content } = Layout;

class DashboardProfile extends Component {
	render() {
		// console.log('this.props in DashboardProfile.js', this.props);
		return (
			<Content
				style={{
					padding: '10% 10% 5%', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text2Color }}>
					Let's get to know each other :)
				</h1>
				<ProfileForm />
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

export default connect(mapStateToProps, null)(DashboardProfile);
