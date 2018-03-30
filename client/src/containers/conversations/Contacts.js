import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';

import contacts1 from './contacts1';
import { Layout, Row, Col, Button } from 'antd';
const { Content } = Layout;

const fakeDataUrl =
	'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class Contacts extends Component {
	componentWillMount() {
		// run once before first render()
	}

	renderContacts() {
		const { colorTheme } = this.props;

		return _.map(contacts1, (contact, index) => {
			return (
				<Row
					key={index}
					style={{
						padding: '5px 0px 0px' // top left&right bottom
					}}
				>
					<Col>
						<Button>{contact.name}</Button>
					</Col>
				</Row>
			);
		});
	}

	render() {
		//console.log('Contacts this.props = ', this.props);
		const { colorTheme } = this.props;

		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '75px 50px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="start" align="middle">
					<Col
						style={{
							color: colorTheme.text3Color
						}}
					>
						<p>Contacts</p>
						{this.renderContacts()}
					</Col>
				</Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
