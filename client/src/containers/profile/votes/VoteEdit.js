import _ from 'lodash';
import React, { Component } from 'react';
import * as voteEditActionCreators from '../../../actions/profile/voteEdit';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Row, Col, Button } from 'antd';

class VoteEdit extends Component {
	componentWillMount() {
		// run once before first render()
	}

	onPressPage(displayPage) {
		this.props.onPressPage(displayPage);
	}

	renderPagination() {
		const { colorTheme, profile, voteEdit } = this.props;

		let numberOfItems = 0;
		if (profile.asks != null) {
			numberOfItems = profile.asks.votes.length;
		}

		const numberOfButtons = Math.round(numberOfItems / 8);
		return _.map(new Array(numberOfButtons), (pageButton, index) => {
			let textColor = colorTheme.text5Color;
			const displayPage = index + 1;
			if (voteEdit.page === displayPage) {
				textColor = colorTheme.text1Color;
			}
			return (
				<Col
					key={index}
					style={{
						padding: '0px 3px'
					}}
				>
					<Button
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: textColor
						}}
						onClick={e => this.onPressPage(displayPage)}
					>
						{displayPage}
					</Button>
				</Col>
			);
		});
	}

	renderVotes() {
		const { colorTheme, profile, voteEdit } = this.props;

		const PER_PAGE = 8;
		if (profile.asks != null) {
			let i = 0;
			let f = PER_PAGE;
			if (voteEdit.page !== 1) {
				i = (voteEdit.page - 1) * PER_PAGE;
				f = voteEdit.page * PER_PAGE;
			}
			console.log('i = ', i);
			console.log('f = ', f);

			const newest5Votes = profile.asks.votes.slice(i, f).reverse();
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
										color: colorTheme.text3Color
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
										color: colorTheme.text3Color
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

		return (
			<div>
				{this.renderVotes()}
				<Row type="flex" justify="start" align="middle">
					{this.renderPagination()}
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
		profile: state.profile,
		voteEdit: state.voteEdit
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	const voteEditDispatchers = bindActionCreators(
		voteEditActionCreators,
		dispatch
	);

	return {
		onPressPage: newPage => {
			voteEditDispatchers.onPressPage(newPage);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteEdit);
