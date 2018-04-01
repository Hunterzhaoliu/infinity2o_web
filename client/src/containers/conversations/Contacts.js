import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import * as conversationsActionCreators from '../../actions/conversations';
import { bindActionCreators } from 'redux';
import { Layout, List, Spin, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './Contacts.css';
const { Content } = Layout;

//let i = 20;

class Contacts extends Component {
	componentWillMount() {
		// run once before first render()
	}

	handleInfiniteOnLoad = () => {
		const {
			contacts,
			displayedContacts,
			setLoading,
			setHasMore,
			displayMoreContacts
		} = this.props;

		// let data = this.state.data;
		// this.setState({
		// 	loading: true
		// });
		setLoading(true);
		if (displayedContacts.length === contacts.length) {
			setLoading(false);
			setHasMore(false);
			// this.setState({
			// 	hasMore: false,
			// 	loading: false
			// });
			return;
		}
		displayMoreContacts(5);
		// data = data.concat(contacts.slice(i, i + 5));
		//
		// i += 5;

		setLoading(false);
		// this.setState({
		// 	data: data,
		// 	loading: false
		// });
	};

	onSelectContact = id => {
		console.log('onSelectContact id = ', id);
	};

	render() {
		//console.log('Contacts this.props = ', this.props);
		const {
			colorTheme,
			contacts,
			displayedContacts,
			loading,
			hasMore
		} = this.props;
		console.log('Contacts.js contacts = ', contacts);
		console.log('Contacts.js displayedContacts = ', displayedContacts);

		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '0px 0px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				<div className="demo-infinite-container">
					<InfiniteScroll
						initialLoad={false}
						loadMore={this.handleInfiniteOnLoad}
						hasMore={!loading && hasMore}
						useWindow={false}
					>
						<List
							dataSource={displayedContacts}
							renderItem={item => {
								//console.log('item = ', item);
								return (
									<List.Item
										style={{
											borderColor:
												colorTheme.backgroundColor,
											background:
												colorTheme.backgroundColor,
											padding: '5px 0px 0px'
										}}
									>
										<Button
											style={{
												borderColor:
													colorTheme.text8Color,
												background:
													colorTheme.text8Color,
												color: colorTheme.text4Color,
												height: '50px',
												width: '220px'
											}}
											onClick={e =>
												this.onSelectContact(
													item.conversationId
												)
											}
										>
											{item.matchName}
										</Button>
									</List.Item>
								);
							}}
						>
							{loading &&
								hasMore && <Spin className="demo-loading" />}
						</List>
					</InfiniteScroll>
				</div>
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
		conversations: state.conversations,
		contacts: state.conversations.contacts,
		displayedContacts: state.conversations.displayedContacts,
		setLoading: state.conversations.setLoading,
		setHasMore: state.conversations.setHasMore,
		displayMoreContacts: state.conversations.displayMoreContacts
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

	const conversationsDispatchers = bindActionCreators(
		conversationsActionCreators,
		dispatch
	);

	return {
		onPressConversations: () => {
			colorThemeDispatchers.onPressConversations();
		},
		setLoading: loading => {
			conversationsDispatchers.setLoading(loading);
		},
		setHasMore: hasMore => {
			conversationsDispatchers.setHasMore(hasMore);
		},
		displayMoreContacts: numberOfContacts => {
			conversationsDispatchers.displayMoreContacts(numberOfContacts);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
