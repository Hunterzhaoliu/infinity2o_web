import React from 'react';
import { Link } from 'react-router-dom';

const Questions = () => {
	return (
		<div>
			Questions
			<div>
				<Link to="/questions/new">
					<i>add</i>
				</Link>
			</div>
		</div>
	);
};

export default Questions;
