import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Select } from 'antd';
const { Option } = Select;

class InputFieldSelect extends Component {
	render() {
		//console.log('this.props in InputFieldSelect', this.props);
		return (
			<div>
				<Row type="flex" justify="start" align="middle">
					<Col
						sm={{ span: 5 }}
						md={{ span: 6 }}
						lg={{ span: 6 }}
						xl={{ span: 6 }}
					>
						<label
							style={{
								color: this.props.colorTheme.text1Color
							}}
						>
							{this.props.label}
						</label>
					</Col>
					<Col
						sm={{ span: 18, offset: 1 }}
						md={{ span: 18 }}
						lg={{ span: 18 }}
						xl={{ span: 18 }}
					>
						<Select
							mode="multiple"
							placeholder={this.props.placeholder}
							style={{
								width: this.props.width,
								borderColor: this.props.colorTheme.text6Color,
								color: this.props.colorTheme.text1Color
							}}
						>
							<Option value="Architecture">Architecture</Option>
							<Option value="Art & Culture">Art & Culture</Option>
							<Option value="Biology & Life Sciences">
								Biology & Life Sciences
							</Option>
							<Option value="Business & Management">
								Business & Management
							</Option>
							<Option value="Chemistry">Computer Science</Option>
							<Option value="Communication">Communication</Option>
							<Option value="Computer Science">
								Computer Science
							</Option>
							<Option value="Data Analysis & Statistics">
								Data Analysis & Statistics
							</Option>
							<Option value="Design">Design</Option>
							<Option value="Economics & Finance">
								Economics & Finance
							</Option>
							<Option value="Education & Teacher Training">
								Education & Teacher Training
							</Option>
							<Option value="Electronics">Electronics</Option>
							<Option value="Energy & Earth Sciences">
								Energy & Earth Sciences
							</Option>
							<Option value="Engineering">Engineering</Option>
							<Option value="Environmental Studies">
								Environmental Studies
							</Option>
							<Option value="Ethics">Ethics</Option>
							<Option value="Food & Nurtition">
								Food & Nurtition
							</Option>
							<Option value="Health & Safety">
								Health & Safety
							</Option>
							<Option value="History">History</Option>
							<Option value="Humanities">Humanities</Option>
							<Option value="Language & Literature">
								Language & Literature
							</Option>
							<Option value="Law">Law</Option>
							<Option value="Math">Math</Option>
							<Option value="Medicine">Medicine</Option>
							<Option value="Music">Music</Option>
							<Option value="Philosophy & Ethics">
								Philosophy & Ethics
							</Option>
							<Option value="Physics">Physics</Option>
							<Option value="Science">Science</Option>
							<Option value="Social Sciences">
								Social Sciences
							</Option>
						</Select>
					</Col>
				</Row>
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

export default connect(mapStateToProps, null)(InputFieldSelect);
