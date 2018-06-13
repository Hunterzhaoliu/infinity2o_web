import _ from 'lodash';
import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import { testimonialData } from './testimonialData';
import { GREY_2, GREY_9 } from '../styles/ColorConstants';

import { Layout, Row, Col, Card, Avatar } from 'antd';
const { Content } = Layout;

function SampleNextArrow(props) {
	return <div />;
}

function SamplePrevArrow(props) {
	return <div />;
}

class Testimonials extends Component {
	renderTestimonials() {
		return _.map(testimonialData, (testimonial, index) => {
			return (
				<div key={index}>
					<Row
						style={{
							padding: '0% 0% 0%' // top left&right bottom
						}}
						type="flex"
						justify="center"
					>
						<Col>
							<Card
								id="testimonial"
								hoverable={true}
								borderded="false"
								loading={false}
								style={{
									textAlign: 'center',
									borderColor: GREY_2,
									background: GREY_2
								}}
							>
								<Avatar
									size="large"
									src={testimonial['avatarProfilePicUrl']}
									style={{
										width: 125,
										height: 125
									}}
								/>
								<p
									style={{
										color: GREY_9
									}}
								>
									{testimonial['quote']}
								</p>
							</Card>
						</Col>
					</Row>
				</div>
			);
		});
	}

	render() {
		const settings = {
			dots: true,
			adaptiveHeight: true,
			infinite: true,
			autoplay: true,
			pauseOnHover: true,
			speed: 500, // transition speed
			autoplaySpeed: 6000, // delay between each auto scroll (in milliseconds)
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			pauseOnDotsHover: true,
			pauseOnFocus: true
		};

		return (
			<Content>
				<Slider {...settings}>{this.renderTestimonials()}</Slider>
			</Content>
		);
	}
}

export default connect(null, null)(Testimonials);
