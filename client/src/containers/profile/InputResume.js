import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Button, Icon, message, Row, Col } from 'antd';
import ErrorMessage from './ErrorMessage';

class InputResume extends Component {
	render() {
		//console.log('this.props in InputResume', this.props);
		// <input onBlur={input.onBlur} onChange={input.onChange} />
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 5 }}
						md={{ span: 5 }}
						lg={{ span: 5 }}
						xl={{ span: 5 }}
					>
						<h3
							style={{
								color: this.props.colorTheme.keyText5Color
							}}
						>
							{this.props.label}
						</h3>
					</Col>
					<Col
						sm={{ span: 18, offset: 1 }}
						md={{ span: 18, offset: 1 }}
						lg={{ span: 18, offset: 1 }}
						xl={{ span: 18, offset: 1 }}
					>
						<Upload
							href="/resume"
							target="_blank"
							{...this.props.input}
							value={this.props.input.value || []}
						>
							<Button>
								<Icon type="upload" /> Upload
							</Button>
						</Upload>
					</Col>
				</Row>
				<ErrorMessage meta={this.props.meta} />
			</div>
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
		userInfo: state.auth.userInfo
	};
}

export default connect(mapStateToProps, null)(InputResume);
