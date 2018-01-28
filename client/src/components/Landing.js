import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import { Layout, Button } from 'antd';
const { Content } = Layout;

class Landing extends Component {
	renderIdeaMeritocracyStrategy() {
		const intro = `We at infinity2o believe the truth gets harder to find as
        information quantity increases. So we created an idea
        meritocracy where you can anonymously make believability
        weighed votes to help get everyone closer to the evolving truth.
        Current strategy:`;
		const step1 = `1) Ask research questions that don't have 1 right answer
        anonymously.`;
		const step2 = `2) Express, vote, & revote on possible answers
        anonymously or publicly.`;
		const step3 = `3) In general, more people change their beliefs towards
        the truth than people who change towards untruths over time.`;
		const step3_1 = `3.1) Examples:
            Flat earth vs. round earth |
            Earth in the center vs. not in the center |
            Santa vs. no Santa |
            Human like god vs. agnostic |
            No human free will vs. there is human free will`;
		const step3_2 = `3.2) CounterExamples:
                TODO: submit one`;
		const step4 = `4) Track people's change in beliefs to figure out how
        believable they are during future votes.`;
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
							key="1"
							avgTypingDelay={42}
							cursor={{
								show: false
							}}
						>
							<Typist.Delay ms={3000} />
							<h2
								key="2"
								style={{
									color: this.props.colorTheme.text2Color
								}}
							>
								{step1}
							</h2>
							<Typist.Delay ms={1000} />
							<h2
								key="3"
								style={{
									color: this.props.colorTheme.text2Color
								}}
							>
								{step2}
							</h2>
							<Typist.Delay ms={1000} />
							<h2
								key="4"
								style={{
									color: this.props.colorTheme.text2Color
								}}
							>
								{step3}
							</h2>
							<Typist.Delay ms={1000} />
							<h2
								key="5"
								style={{
									color: this.props.colorTheme.text2Color
								}}
							>
								{step3_1}
							</h2>
							<Typist.Delay ms={1000} />
							<h2
								key="6"
								style={{
									color: this.props.colorTheme.text2Color
								}}
							>
								{step3_2}
							</h2>
							<Typist.Delay ms={1000} />
							<h2
								key="7"
								style={{
									color: this.props.colorTheme.text2Color
								}}
							>
								{step4}
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
							key="2"
							style={{
								color: this.props.colorTheme.text2Color
							}}
						>
							{step1}
						</h2>
						<h2
							key="3"
							style={{
								color: this.props.colorTheme.text2Color
							}}
						>
							{step2}
						</h2>
						<h2
							key="4"
							style={{
								color: this.props.colorTheme.text2Color
							}}
						>
							{step3}
						</h2>
						<h2
							key="5"
							style={{
								color: this.props.colorTheme.text2Color
							}}
						>
							{step3_1}
						</h2>
						<h2
							key="6"
							style={{
								color: this.props.colorTheme.text2Color
							}}
						>
							{step3_2}
						</h2>
						<h2
							key="7"
							style={{
								color: this.props.colorTheme.text2Color
							}}
						>
							{step4}
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
				{this.renderIdeaMeritocracyStrategy()}
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
		auth: state.auth,
		colorTheme: state.colorTheme
	};
}

export default connect(mapStateToProps, null)(Landing);
