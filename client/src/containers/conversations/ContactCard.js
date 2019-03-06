import React, { Component } from "react";
import { connect } from "react-redux";
import MatchCards from "../matches/MatchCards";

class Conversation extends Component {
	renderContactCard() {
		const { history, selectedContactMongoDBInfo } = this.props;
		if (selectedContactMongoDBInfo !== null) {
			return (
				<MatchCards
					match={selectedContactMongoDBInfo}
					history={history}
				/>
			);
		}
	}

	render() {
		return <div>{this.renderContactCard()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		selectedContactMongoDBInfo:
			state.contacts.selectedConversationInfo.selectedContactMongoDBInfo
	};
}

export default connect(
	mapStateToProps,
	null
)(Conversation);
