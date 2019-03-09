import React, { Component } from "react";
import { connect } from "react-redux";
import * as sortingHatActionCreators from "../../actions/sorting_hat/sortingHat";
import { bindActionCreators } from "redux";
import { Button, Col, Row } from "antd";

class AskCategories extends Component {
	render() {
		const {
			onNewestAsks,
			onPopularAsks,
			onControversialAsks,
			theme
		} = this.props;

		return (
			<Row
				type="flex"
				justify="center"
				align="middle"
				style={{
					padding: "0px 0px 15px" // top left&right bottom
				}}
			>
				<Col
					sm={{ span: 7 }}
					md={{ span: 6 }}
					lg={{ span: 5 }}
					xl={{ span: 4 }}
				>
					<Button
						style={{
							borderColor: theme.newestButtonColor,
							background: theme.newestButtonColor,
							color: theme.newestButtonTextColor,
							fontFamily: "Overpass"
						}}
						onClick={onNewestAsks}
					>
						Newest
					</Button>
				</Col>
				<Col
					sm={{ span: 7 }}
					md={{ span: 6 }}
					lg={{ span: 5 }}
					xl={{ span: 4 }}
				>
					<Button
						style={{
							borderColor: theme.popularButtonColor,
							background: theme.popularButtonColor,
							color: theme.popularButtonTextColor,
							fontFamily: "Overpass"
						}}
						onClick={onPopularAsks}
					>
						Popular
					</Button>
				</Col>
				<Col
					sm={{ span: 8 }}
					md={{ span: 7 }}
					lg={{ span: 6 }}
					xl={{ span: 5 }}
				>
					<Button
						style={{
							borderColor: theme.controversialButtonColor,
							background: theme.controversialButtonColor,
							color: theme.controversialButtonTextColor,
							fontFamily: "Overpass"
						}}
						onClick={onControversialAsks}
					>
						Controversial
					</Button>
				</Col>
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return {
		theme: state.sortingHat.theme
	};
}

function mapDispatchToProps(dispatch) {
	const sortingHatDispatchers = bindActionCreators(
		sortingHatActionCreators,
		dispatch
	);

	return {
		onNewestAsks: () => {
			sortingHatDispatchers.onNewestAsks();
		},
		onPopularAsks: () => {
			sortingHatDispatchers.onPopularAsks();
		},
		onControversialAsks: () => {
			sortingHatDispatchers.onControversialAsks();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AskCategories);
