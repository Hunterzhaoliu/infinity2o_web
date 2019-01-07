import React, { Component } from "react";
import { connect } from "react-redux";
import * as landingActionCreators from "../../actions/landing";
import { bindActionCreators } from "redux";
import { GREY_9, GREY_7, GREY_1 } from "../styles/ColorConstants";
import "./FirstVote.css";
import LoginButtons from "./LoginButtons";
import { Modal } from "antd";

class FirstVote extends Component {
	render() {
		const { isFirstVoteModalOpen } = this.props;

		document.documentElement.style.setProperty(`--GREY_1`, GREY_1);

		return (
			<Modal
				visible={isFirstVoteModalOpen}
				onCancel={e => this.props.closeModal()}
				footer={null}
				centered={true}
				style={{ padding: "90px 0px 0px 0px" }}
			>
				<h2
					style={{
						textAlign: "center",
						color: GREY_9,
						fontFamily: "Lucida Grande",
						fontWeight: "bold",
						fontSize: "32px",
						padding: "60px 0px 0px",
						marginBottom: 0,
						lineHeight: 1
					}}
				>
					Congrats on your first vote!
				</h2>
				<p
					style={{
						textAlign: "center",
						color: GREY_7,
						fontFamily: "Lucida Grande",
						fontSize: "22px",
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
		isFirstVoteModalOpen: state.landing.isFirstVoteModalOpen
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
