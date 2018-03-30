import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as colorThemeActionCreators from '../../actions/colorTheme';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, List, message, Spin } from 'antd';
import contacts1 from './contacts1';
import InfiniteScroll from 'react-infinite-scroller';
import './Contacts.css';
const { Content } = Layout;

let i = 6;

class Contacts extends Component {
	state = {
		data: [],
		loading: false,
		hasMore: true
	};

	componentWillMount() {
		// run once before first render()
		this.setState({
			data: contacts1.slice(0, 6)
		});
	}

	handleInfiniteOnLoad = () => {
		let data = this.state.data;
		this.setState({
			loading: true
		});
		if (data.length > 15) {
			message.warning('Infinite List loaded all');
			this.setState({
				hasMore: false,
				loading: false
			});
			return;
		}
		data = data.concat(contacts1.slice(i, i + 5));
		i += 5;
		this.setState({
			data: data,
			loading: false
		});
	};

	render() {
		//console.log('Contacts this.props = ', this.props);
		const { colorTheme } = this.props;

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
						hasMore={!this.state.loading && this.state.hasMore}
						useWindow={false}
					>
						<List
							dataSource={this.state.data}
							renderItem={item => (
								<List.Item key={item.id}>
									<p style={{ color: colorTheme.text3Color }}>{item.name}</p>
								</List.Item>
							)}
						>
							{this.state.loading &&
								this.state.hasMore && <Spin className="demo-loading" />}
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
		colorTheme: state.colorTheme
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

	return {
		onPressConversations: () => {
			colorThemeDispatchers.onPressConversations();
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
