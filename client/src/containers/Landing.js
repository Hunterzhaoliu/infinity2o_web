import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import { Layout, Button, Row, Col } from 'antd';
const { Content } = Layout;

class Landing extends Component {
	renderMarketingInfo() {
		const intro = `Online classes are amazing but too lonely.
        Join our community to find a partner for your online classes.`;
		const step1 = `1) Answer a few simple questions.`;
		const step2 = `2) Let our AI find you a great study partner at the same skill level with similar interests.`;
		switch (this.props.auth.userInfo) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				// not logged in
				return (
					<div>
						<h1
							key="0"
							style={{ color: this.props.colorTheme.text1Color }}
						>
							{intro}
						</h1>
						<Typist
							avgTypingDelay={42}
							cursor={{
								show: false
							}}
						>
							<Typist.Delay ms={3000} />
							<h2
								key="1"
								style={{
									color: this.props.colorTheme.text3Color
								}}
							>
								{step1}
							</h2>
							<Typist.Delay ms={3000} />
							<h2
								key="2"
								style={{
									color: this.props.colorTheme.text3Color
								}}
							>
								{step2}
							</h2>
						</Typist>
					</div>
				);
			default:
				// logged in
				return (
					<div>
						<h1
							key="0"
							style={{ color: this.props.colorTheme.text1Color }}
						>
							{intro}
						</h1>
						<h2
							key="1"
							style={{
								color: this.props.colorTheme.text3Color
							}}
						>
							{step1}
						</h2>
						<h2
							key="2"
							style={{
								color: this.props.colorTheme.text3Color
							}}
						>
							{step2}
						</h2>
					</div>
				);
		}
	}

	renderLogin() {
		switch (this.props.auth.userInfo) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				return (
					<div>
						<Row type="flex" justify="space-around">
							<Col span={8} />
							<Col span={4}>
								<Button
									key="-1"
									style={{
										borderColor: this.props.colorTheme.key,
										background: this.props.colorTheme.key,
										color: this.props.colorTheme.text1Color
									}}
								>
									<a href="/auth/google">Google Login</a>
								</Button>
							</Col>
							<Col span={4}>
								<Button
									key="0"
									style={{
										borderColor: this.props.colorTheme
											.keyCompliment1,
										background: this.props.colorTheme
											.keyCompliment1,
										color: this.props.colorTheme.text1Color
									}}
								>
									<a href="/auth/linkedIn">LinkedIn Login</a>
								</Button>
							</Col>
							<Col span={8} />
						</Row>
					</div>
				);
			default:
				return;
		}
	}

	render() {
		//console.log('this.props inside Landing', this.props);

		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '100px 50px 81px', // top left&right bottom
					minHeight: 82,
					background: this.props.colorTheme.backgroundColor
				}}
			>
				{this.renderMarketingInfo()}
				{this.renderLogin()}
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
		colorTheme: state.colorTheme,
		auth: state.auth
	};
}

export default connect(mapStateToProps, null)(Landing);
