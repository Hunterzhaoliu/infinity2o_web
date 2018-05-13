import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Pagination } from 'antd';

class VoteEdit extends Component {
	componentWillMount() {
		// run once before first render()
	}

	state = {
		current: 3
	};
	onChange = page => {
		console.log(page);
		this.setState({
			current: page
		});
	};

	renderVotes(asks, colorTheme) {
		if (asks != null) {
			const newest5Votes = asks.votes.slice(-8).reverse();
			return _.map(newest5Votes, (vote, key) => {
				return (
					<div key={key}>
						<Row type="flex" justify="start" align="middle">
							<Col
								sm={{ span: 5 }}
								md={{ span: 5 }}
								lg={{ span: 5 }}
								xl={{ span: 5 }}
							>
								<h3
									style={{
										color: colorTheme.text6Color
									}}
								>
									{vote.question}
								</h3>
							</Col>
							<Col
								sm={{ span: 18, offset: 1 }}
								md={{ span: 18, offset: 1 }}
								lg={{ span: 18, offset: 1 }}
								xl={{ span: 18, offset: 1 }}
							>
								<h3
									style={{
										color: colorTheme.text6Color
									}}
								>
									{vote.selectedAnswer}
								</h3>
							</Col>
						</Row>
					</div>
				);
			});
		}
	}

	render() {
		//console.log('this.props inside VoteEdit', this.props);
		const { colorTheme, profile } = this.props;
		let total = 0;
		if (profile.asks != null) {
			total = profile.asks.votes.length;
		}
		console.log('total = ', total);
		return (
			<div>
				{this.renderVotes(profile.asks, colorTheme)}
				<Row type="flex" justify="start" align="middle">
					<Col>
						<Pagination
							current={this.state.current}
							onChange={this.onChange}
							pageSize={8}
							total={total}
						/>
					</Col>
				</Row>
			</div>
		);
	}

	componentDidMount() {
		// run once after first render()
		//console.log('componentDidMount this.props = ', this.props);
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme,
		profile: state.profile
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteEdit);
