import React, { Component } from "react";
import { connect } from "react-redux";
import { Col } from "antd";
import "./general-header-button.css";

class TourButton extends Component {
	render() {
		const { colorTheme } = this.props;

		document.documentElement.style.setProperty(
			`--text8Color`,
			colorTheme.text8Color
		);
		document.documentElement.style.setProperty(
			`--keyText5Color`,
			colorTheme.keyText5Color
		);

		return (
			<Col
				md={{ offset: 1 }}
				lg={{ offset: 3 }}
				xl={{ offset: 2 }}
				key="1"
			>
				<div
					className="button-div"
					style={{
						borderBottom: "3px solid " + colorTheme.tourButtonColor
					}}
				>
					<button>
						<a
							style={{ color: colorTheme.tourButtonColor }}
							href="/tour"
						>
							Tour
						</a>
					</button>
				</div>
			</Col>
		);
	}
}

function mapStateToProps(state) {
	return {
		colorTheme: state.colorTheme
	};
}

export default connect(
	mapStateToProps,
	null
)(TourButton);
