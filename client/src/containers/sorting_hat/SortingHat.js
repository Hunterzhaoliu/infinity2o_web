import React, { Component } from "react";
import { connect } from "react-redux";
import * as sortingHatActionCreators from "../../actions/sorting_hat/sortingHat";
import * as colorThemeActionCreators from "../../actions/colorTheme";
import { bindActionCreators } from "redux";
import { Layout, Row, Col, Button } from "antd";
import InputVote from "./InputVote";
const { Content } = Layout;

class SortingHat extends Component {
	componentWillMount() {
		// run once before first render()
		this.props.onSortingHat();
		this.props.fetchUserSortingHatAsks(this.props.auth.mongoDBUserId);
	}

	render() {
		const { colorTheme, history } = this.props;
		return (
			<Content
				style={{
					padding: "120px 0px 0px 0px",
					background: colorTheme.backgroundColor
				}}
			>
				<Row type="flex" justify="center" align="middle">
					<Col>
						<h2
							style={{
								color: colorTheme.text2Color,
								marginBottom: 0,
								lineHeight: 1,
								fontSize: 32,
								fontFamily: "Lucida Grande"
							}}
						>
							Help the Sorting Hat find you great partners by
						</h2>
					</Col>
					<Col
						style={{
							padding: "0px 0px 0px 10px"
						}}
					>
						<Button
							style={{
								borderColor: colorTheme.keyText7Color,
								background: colorTheme.keyText7Color,
								height: 32
							}}
						>
							<a href="/sorting_hat/ask">
								<p
									style={{
										color: colorTheme.text2Color,
										fontSize: 20,
										fontFamily: "Lucida Grande",
										marginBottom: 0,
										lineHeight: 1
									}}
								>
									asking a question
								</p>
							</a>
						</Button>
					</Col>
				</Row>
				<Row type="flex" justify="center" align="middle">
					<Col
						style={{
							padding: "30px 0px 30px 0px"
						}}
					>
						<h2
							style={{
								textAlign: "center",
								color: colorTheme.text4Color,
								marginBottom: 0,
								lineHeight: 1,
								fontSize: 20,
								fontFamily: "Lucida Grande"
							}}
						>
							Or voting on questions that matter to you:
						</h2>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col
						xs={{ span: 19 }}
						sm={{ span: 16 }}
						md={{ span: 20 }}
						lg={{ span: 18 }}
						xl={{ span: 15 }}
					>
						<InputVote history={history} />
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
		colorTheme: state.colorTheme,
		auth: state.auth
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

	const sortingHatDispatchers = bindActionCreators(
		sortingHatActionCreators,
		dispatch
	);

	return {
		onSortingHat: () => {
			colorThemeDispatchers.onSortingHat();
		},
		fetchUserSortingHatAsks: mongoDBUserId => {
			sortingHatDispatchers.fetchUserSortingHatAsks(mongoDBUserId);
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SortingHat);
