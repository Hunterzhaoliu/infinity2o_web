import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Layout } from 'antd';
const { Content } = Layout;

class Ask extends Component {
	// constructor(props) {
	// 	super(props);
	//
	// 	this.state = { new: true };
	// }
	state = { showFormReview: false };
	renderContent() {}

	render() {
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					background: this.props.colorTheme.backgroundColor
				}}
			>
				<h1 key="0" style={{ color: this.props.colorTheme.text1Color }}>
					Ask Research Question
				</h1>
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

Ask = connect(mapStateToProps, null)(Ask);

export default reduxForm({
	askForm: 'askForm'
})(Ask);
