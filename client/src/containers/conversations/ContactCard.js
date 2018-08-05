import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import MatchCards from "../matches/MatchCards";
// import { Row, Col } from "antd";

class Conversation extends Component {
	renderContactCard() {
		const { history, selectedContactMongoDBInfo } = this.props;
		if (selectedContactMongoDBInfo !== null) {
			return (
				<MatchCards match={selectedContactMongoDBInfo} history={history} />
			);
		}
	}

	render() {
		return <div>{this.renderContactCard()}</div>;
	}
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
	return {
		selectedContactMongoDBInfo:
			state.contacts.selectedConversationInfo.selectedContactMongoDBInfo
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
