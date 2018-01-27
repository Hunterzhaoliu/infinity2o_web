import React from 'react';
import { Input } from 'antd';

export default ({ input, label, placeholder, meta }) => {
	// {...input} = <input onBlur={input.onBlur} onChange={input.onChange} />
	return (
		<div>
			<label>{label}</label>
			<Input {...input} size="default" style={{ width: 550 }} />
			<div style={{ marginBottom: '5px' }}>
				{meta.touched && meta.error}
			</div>
		</div>
	);
};
