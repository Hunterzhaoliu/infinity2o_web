import React from 'react';

export default ({ input }) => {
	// <input onBlur={input.onBlur} onChange={input.onChange} />
	return (
		<div>
			<input {...input} style={{ marginBottom: '5px' }} />
		</div>
	);
};
