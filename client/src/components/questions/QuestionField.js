import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

class QuestionField extends Component {
	render() {
		console.log('this.props in QuestionField', this.props);
		return (
			<div>
				<label
					style={{
						color: this.props.colorTheme.text1Color
					}}
				>
					{this.props.label}
				</label>
				<Input
					{...this.props.input}
					size="default"
					style={{
						width: 653, // end pixel aligns where logout button begins
						borderColor: this.props.colorTheme.text4Color,
						background: this.props.colorTheme.text4Color,
						color: this.props.colorTheme.text1Color
					}}
				/>
				<div style={{ marginBottom: '5px' }}>
					{this.props.meta.touched && this.props.meta.error}
				</div>
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
		colorTheme: state.colorTheme
	};
}

export default connect(mapStateToProps, null)(QuestionField);
