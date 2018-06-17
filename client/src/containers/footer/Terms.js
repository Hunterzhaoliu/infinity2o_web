import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	GREY_1,
	GREY_5,
	GREY_6,
	GREY_7,
	GREY_8,
	GREY_9
} from '../styles/ColorConstants';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

class Terms extends Component {
	render() {
		const { colorTheme, loggedInState, name } = this.props;

		let background = colorTheme.backgroundColor;
		let text1Color = colorTheme.text1Color;
		let text2Color = colorTheme.text2Color;
		let text3Color = colorTheme.text3Color;
		let text4Color = colorTheme.text4Color;

		if (loggedInState === 'not_logged_in') {
			background = GREY_1;
			text1Color = GREY_9;
			text2Color = GREY_8;
			text3Color = GREY_7;
			text4Color = GREY_6;
		}

		return (
			<Content
				style={{
					padding: '75px 50px 0px', // top right bottom left
					background: background
				}}
			>
				<Row type="flex" justify="center">
					<Col>
						<h1 style={{ color: text1Color }}>
							Terms of Use & Conditions
						</h1>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<p style={{ color: GREY_5 }}>
							Last revised on June 15, 2018
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col>
						<p style={{ color: text2Color }}>
							Hello {name}! Our mission at Infinity2o is to
							provide anyone the perfect learning partner.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>
							1. Acceptance of Terms of Use Agreement
						</p>
						<p style={{ color: text4Color }}>
							By creating an account on infinity2o.com, you must
							be at least 13 years old. By using your LinkedIn or
							email account to login, you agree to the Terms and
							Condition, Privacy Policy, and the use of Cookies.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>2. Types of Content</p>
						<p style={{ color: text4Color }}>
							Since you can create questions and talk to other
							users through matches, we have to have certain
							restrictions on the certain content that can be
							discussed or created such as
						</p>
						<ul style={{ color: text4Color }}>
							<li>
								Any language or imagery that could harass or
								upset any other person
							</li>
							<li>
								Any abusive, violent, threatening, and
								discriminatory actions that promote racism or
								sexism
							</li>
							<li>
								Anything that encourages any illegal activity
								inciting terrorism or racial hatred that can
								constitutes as committing a criminal offence
							</li>
							<li>
								Viruses, worm programmes, or other malicious
								code that could damage any software or hardware
								relating to the company
							</li>
						</ul>
						<p style={{ color: text4Color }}>
							Any content that you post or create is your
							responsible and you cannot hold infinity2o or other
							users accountable for anything that you create. If
							you reveal any personal information such as mailing
							address or banking details, it is at your own risk.
						</p>
						<ul style={{ color: text4Color }}>
							<li>
								You cannot sell, use, or modify infinity2o’s
								content except as permitted through the website.
							</li>
							<li>
								You cannot create similar work from Our Content
								or commercially exploit Our Content
							</li>
							<li>
								You can only use Our Content for lawful purposes
								only
							</li>
							<li>You cannot use our name in any hidden texts</li>
						</ul>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>
							3. Restrictions of the App
						</p>
						<p style={{ color: text4Color }}>
							By using the website infinity2o.com and creating an
							account, you agree to:
						</p>
						<ul style={{ color: text4Color }}>
							<li>
								Comply with all applicable laws, including
								without limitation, privacy laws, intellectual
								property laws, anti-spam laws, equal opportunity
								laws and regulatory requirements
							</li>
							<li>
								Use your real name and not someone else’s
								identity
							</li>
							<li>Use the service in a professional manner</li>
						</ul>
						<p style={{ color: text4Color }}>You agree not to:</p>
						<ul style={{ color: text4Color }}>
							<li>Act in an unlawful manner</li>
							<li>Misrepresent your identity</li>
							<li>
								Disclose information that you do not have the
								consent to disclose
							</li>
							<li>Create any fraud or similar practices</li>
						</ul>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>4. Privacy</p>
						<p style={{ color: text4Color }}>
							By using infinity2o.com, you agree to accept our
							Privacy Policy
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>5. Third Parties</p>
						<p style={{ color: text4Color }}>
							Infinity2o currently does not have any third parties
							or affiliate companies.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>
							6. Location Based Features
						</p>
						<p style={{ color: text4Color }}>
							Your location is solely based on the information you
							share since inifinity2o currently doesn’t have a GPS
							tracking service.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>7. Disclaimer</p>
						<p style={{ color: text4Color }}>
							The site of infinity2o content is without warranty
							of any kind, either expressed or implied. Should the
							law not permit the exclusion of express or implied
							warranties, we grant the minimum express or implied
							warranty required by applicable law. Additionally,
							we do not make warranties that the site will be
							uninterrupted, secure, or error free. The use of
							infinity2o is at your own risk. Infinity2o is not
							responsible for any users and does not conduct
							criminal background checks on its members.
							Infinity2o and any of its company members are not
							liable for any damage, indirect or direct, loss of
							data, income, profit, loss or damage to property,
							claims of third parties, or our content, however
							caused. If you are dissatisfied in anyway with the
							site, your remedy is to stop the use of the site.
							You hereby waive any and all claims that arise out
							of your use of the site. Due to some states not
							allowing the disclaimer of implied warranties, some
							of these provisions may not apply to you. If any
							portion of this liability is invalid, our aggregate
							liability shall not exceed one dollar U.S. currency.
							This limitation of liability is a fundamental
							element of the basis of bargain and reflects a fair
							allocation of risk. You agree that the limitations
							and exclusions of liability specified will survive
							even if found to have failed in their essential
							purpose.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>8. Indemnity</p>
						<p style={{ color: text4Color }}>
							All the actions you make and information you post on
							infinity2o.com remain your responsibility.
							Therefore, you agree to indemnify, defend, release,
							and hold us, and our partners harmless, from and
							against any third party claims, damages, or actions.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>
							9. Digital Millennium Copyright Act
						</p>
						<p style={{ color: text4Color }}>
							Under the Digital Millennium Copyright act, the
							DMCA, if any of Our Content infringes upon your
							intellectual property rights, submit a notification
							alleging this infringement to
							askinfinity2o@gmail.com.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>10. Miscellaneous</p>
						<p style={{ color: text4Color }}>
							These Terms and Conditions, which we may change and
							will notify you by email, constitute the agreement
							between you and infinity2o. The terms supersede all
							previous agreements. Infinity2o does not give or
							make any warranty of any kind about the information
							of infinity2o.com. The use of infinity2o is at your
							own risk. Infinity2o cannot be held accountable or
							responsible for any loss. You are responsible for
							taking all necessary precautions to ensure that
							infinity2o is free of viruses and other harmful
							components. Infinity2o is not responsible for any
							damage to your computer hardware, computer software,
							or other equipment or technology from security
							breaches or any form of viruses, bugs, tampering, or
							fraud. If for any reason the Terms are declared
							illegal, the extent to that term being illegal will
							be deleted and the rest of the Terms will remain in
							full force and effect. By submitting your personal
							information, you agree for your transfer of your
							information to other countries and destinations for
							other users to see.
						</p>
					</Col>
				</Row>
				<Row type="flex" justify="start">
					<Col>
						<p style={{ color: text2Color }}>11. Recap</p>
						<p style={{ color: text4Color }}>
							By creating an account on infinity2o, you are
							consenting to the law and agree that you will not
							file or participate in a class action against
							infinity2o’s company creators. If there are any
							translated copies of the Terms, the original English
							version will surpass any other version. By using the
							website, you are consenting that you will not file
							an action against infinity2o. You agree to all of
							the Terms and Condition statements. If you have any
							questions or concern you may email
							askinfinity2o@gmail.com
						</p>
					</Col>
				</Row>
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
		loggedInState: state.auth.loggedInState,
		name: state.profile.name
	};
}

/*
So we have a state and a UI(with props).
This function gives the UI the functions it will need to be called.
*/
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
