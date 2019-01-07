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
			>
				<h2
					style={{
						textAlign: "center",
						color: GREY_9,
						fontFamily: "Lucida Grande",
						fontWeight: "bold",
						fontSize: "35px",
						padding: "50px 0px 0px"
					}}
				>
					Congrats on your first vote!
				</h2>
				<p
					style={{
						textAlign: "center",
						color: GREY_7,
						fontFamily: "Lucida Grande",
						fontSize: "25px",
						padding: "25px 0px 0px"
					}}
				>
					To make your vote count, login with
				</p>
				<div style={{ height: "25px" }} />
				<LoginButtons />
				<div style={{ height: "50px" }} />
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
