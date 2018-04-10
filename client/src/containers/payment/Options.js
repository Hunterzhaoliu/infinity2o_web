import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as paymentActionCreators from '../../actions/payment';
import { bindActionCreators } from 'redux';
import StripeCheckout from 'react-stripe-checkout';

import { Layout, Button, Row, Col, Card } from 'antd';
const { Content } = Layout;

class Options extends Component {
	componentWillMount() {
		// run once before first render()
	}

	renderPaymentOptions() {
		const { colorTheme, handlePayment } = this.props;
		return (
			<Row type="flex" justify="center" align="middle">
				<Col
					sm={{ span: 13 }}
					md={{ span: 10 }}
					lg={{ span: 7 }}
					xl={{ span: 7 }}
					key="3"
				>
					<Card
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: colorTheme.text2Color
						}}
					>
						<h3
							style={{
								color: colorTheme.text2Color
							}}
						>
							$8 for 1 Billion Neurons
						</h3>
						<div
							style={{
								color: colorTheme.text3Color
							}}
						>
							If you're curious...
						</div>

						<Row style={{ padding: '8px 0px 0px' }}>
							<StripeCheckout
								name="Infinity2o"
								description="$8 for 1,000,000,000 Neurons"
								amount={800} // 2 USD
								token={token =>
									handlePayment(
										token,
										800,
										'$8 for 1,000,000,000 Neurons',
										1
									)
								} // onToken() = expecting callback token from Stripe
								stripeKey={process.env.REACT_APP_STRIPE_KEY}
							>
								<Button
									style={{
										borderColor: colorTheme.text7Color,
										background: colorTheme.text7Color,
										color: colorTheme.text2Color
									}}
								>
									Buy 1,000,000,000 Neurons
								</Button>
							</StripeCheckout>
						</Row>
					</Card>
					<Row style={{ padding: '16px 0px 0px' }} />
				</Col>
				<Col
					sm={{ span: 12 }}
					md={{ span: 1 }}
					lg={{ span: 1 }}
					xl={{ span: 1 }}
				/>
				<Col
					sm={{ span: 13 }}
					md={{ span: 10 }}
					lg={{ span: 7 }}
					xl={{ span: 7 }}
					key="4"
				>
					<Card
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: colorTheme.text2Color
						}}
					>
						<h3
							style={{
								color: colorTheme.text2Color
							}}
						>
							$24 for 3.6 Billion Neurons
						</h3>
						<div
							style={{
								color: colorTheme.text3Color
							}}
						>
							Save 20%
						</div>

						<Row style={{ padding: '8px 0px 0px' }}>
							<StripeCheckout
								name="Infinity2o"
								description="$24 for 3,600,000,000 Neurons"
								amount={2400} // 8 USD
								token={token =>
									handlePayment(
										token,
										2400,
										'$24 for 3,600,000,000 Neurons',
										3.6
									)
								} // onToken() = expecting callback token from Stripe
								stripeKey={process.env.REACT_APP_STRIPE_KEY}
							>
								<Button
									style={{
										borderColor: colorTheme.text7Color,
										background: colorTheme.text7Color,
										color: colorTheme.text2Color
									}}
								>
									Buy 3,600,000,000 Neurons
								</Button>
							</StripeCheckout>
						</Row>
					</Card>
					<Row style={{ padding: '16px 0px 0px' }} />
				</Col>
				<Col
					sm={{ span: 12 }}
					md={{ span: 0 }}
					lg={{ span: 1 }}
					xl={{ span: 1 }}
				/>
				<Col
					sm={{ span: 13 }}
					md={{ span: 10 }}
					lg={{ span: 7 }}
					xl={{ span: 7 }}
					key="5"
				>
					<Card
						style={{
							borderColor: colorTheme.text8Color,
							background: colorTheme.text8Color,
							color: colorTheme.text2Color
						}}
					>
						<h3
							style={{
								color: colorTheme.text2Color
							}}
						>
							$2882 for Infinite Neurons
						</h3>
						<div
							style={{
								color: colorTheme.text3Color
							}}
						>
							You will be flown to Infinity2o HQ to join the
							founders for a memorable adventure.
						</div>

						<Row style={{ padding: '8px 0px 0px' }}>
							<StripeCheckout
								name="Infinity2o"
								description="$2882 for Infinite Neurons & trip to HQ"
								amount={288200} // 2882 USD
								token={token =>
									handlePayment(
										token,
										288200,
										'$2882 for Infinite Neurons & trip to HQ',
										88888888
									)
								} // onToken() = expecting callback token from Stripe
								stripeKey={process.env.REACT_APP_STRIPE_KEY}
							>
								<Button
									style={{
										borderColor: colorTheme.text7Color,
										background: colorTheme.text7Color,
										color: colorTheme.text2Color
									}}
								>
									Buy &infin; Neurons
								</Button>
							</StripeCheckout>
						</Row>
					</Card>
				</Col>
			</Row>
		);
	}

	render() {
		//console.log('this.props inside Options', this.props);
		const { colorTheme } = this.props;
		return (
			<Content
				style={{
					textAlign: 'center',
					padding: '0px 0px 0px', // top left&right bottom
					background: colorTheme.backgroundColor
				}}
			>
				{this.renderPaymentOptions()}
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
	const paymentDispatchers = bindActionCreators(
		paymentActionCreators,
		dispatch
	);
	return {
		handlePayment: (
			token,
			amountInUSDCents,
			chargeDescription,
			neuronsInBillionsToAdd
		) => {
			paymentDispatchers.handlePayment(
				token,
				amountInUSDCents,
				chargeDescription,
				neuronsInBillionsToAdd
			);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
