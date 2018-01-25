import * as colors from './styles/ColorConstants';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typist from 'react-typist';
import { Layout } from 'antd';
const { Content } = Layout;
const Radium = require('radium');

class Landing extends Component {
	render() {
		return (
			<Content style={styles.content}>
				<h1 style={styles.h1}>
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
					<h2 style={styles.h2}>
						1) Ask research questions that don't have 1 right answer
					</h2>
					<Typist.Delay ms={300} />
					<h2 style={styles.h2}>
						2) Express, vote, & revote on possible answers
						anonymously or publicly
					</h2>
					<Typist.Delay ms={300} />
					<h2 style={styles.h2}>
						3) Over time people will change their beliefs towards
						the truth
					</h2>
					<Typist.Delay ms={300} />
					<h2 style={styles.h2}>
						4) Track people's change in beliefs to figure out how
						believable they are during future votes
					</h2>
				</Typist>
			</Content>
		);
	}
}

Landing = Radium(Landing);

var styles = {
	content: {
		background: colors.GREY_1,
		textAlign: 'center',
		padding: '100px 50px 81px', // top left&right bottom
		minHeight: 82
	},
	h1: {
		color: colors.GREY_5
	},
	h2: {
		color: colors.GREY_4
	}
};

export default connect(null, null)(Landing);
