import React, { Component } from "react";
import { connect } from "react-redux";
import * as landingActionCreators from "../../actions/landing";
import { bindActionCreators } from "redux";
import { GREY_9, GREY_7, GREY_1 } from "../styles/ColorConstants";
import LoginButtons from "./LoginButtons";
import { Modal } from "antd";

class FirstVote extends Component {
	render() {
		const { isFirstVoteModalOpen, windowWidth } = this.props;

		let h2LineHeight = 1;
		if (windowWidth < 768) {
			h2LineHeight = 1.5;
		}

		return (
			<Modal
				visible={isFirstVoteModalOpen}
				onCancel={e => this.props.closeModal()}
				footer={null}
				centered={true}
				bodyStyle={{ padding: "0px 10px", backgroundColor: GREY_1 }}
				style={{ padding: "90px 0px 0px 0px" }}
			>
				<h2
					style={{
						textAlign: "center",
						color: GREY_9,
						fontFamily: "Lucida Grande",
						fontWeight: "bold",
						fontSize: 32,
						padding: "60px 0px 0px",
						marginBottom: 0,
						lineHeight: h2LineHeight
					}}
				>
					Congrats on your first vote!
				</h2>
				<p
					style={{
						textAlign: "center",
						color: GREY_7,
						fontFamily: "Lucida Grande",
						fontSize: 22,
						padding: "60px 0px 0px",
						marginBottom: 0,
						lineHeight: 1
					}}
				>
					To make your vote count:
				</p>
				<div style={{ height: "30px" }} />
				<LoginButtons />
				<div style={{ height: "60px" }} />
			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		isFirstVoteModalOpen: state.landing.isFirstVoteModalOpen,
		windowWidth: state.customHeader.windowWidth
	};
}

function mapDispatchToProps(dispatch) {
	const landingDispatchers = bindActionCreators(
		landingActionCreators,
		dispatch
	);

	return {
		closeModal: () => {
			landingDispatchers.closeModal();
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FirstVote);
