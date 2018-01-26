import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import { Layout, Button } from 'antd';
const { Content } = Layout;

class Landing extends Component {
	renderLogin() {
		let stateOfUser = this.props.auth;
		switch (stateOfUser) {
			case null:
				// show nothing when still signing in
				return;
			case false:
				return (
					<Button
						key="5"
						style={{
							borderColor: this.props.colorTheme.keyColor,
							background: this.props.colorTheme.keyColor,
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
				<h1 key="0" style={{ color: this.props.colorTheme.text1Color }}>
					We at infinity2o believe the truth gets greyer & harder to
					find as we age. So we aimed to create a place to get as
					close to the evolving truth as possible.
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
						style={{ color: this.props.colorTheme.text2Color }}
					>
						1) Ask research questions that don't have 1 right answer
					</h2>
					<Typist.Delay ms={1000} />
					<h2
						key="2"
						style={{ color: this.props.colorTheme.text2Color }}
					>
						2) Express, vote, & revote on possible answers
						anonymously or publicly
					</h2>
					<Typist.Delay ms={1000} />
					<h2
						key="3"
						style={{ color: this.props.colorTheme.text2Color }}
					>
						3) Over time people will change their beliefs towards
						the truth
					</h2>
					<Typist.Delay ms={1000} />
					<h2
						key="4"
						style={{ color: this.props.colorTheme.text2Color }}
					>
						4) Track people's change in beliefs to figure out how
						believable they are during future votes
					</h2>
				</Typist>
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
