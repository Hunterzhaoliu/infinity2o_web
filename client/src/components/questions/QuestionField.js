import React from 'react';
import QuestionInput from './QuestionInput';
import { Input } from 'antd';
const Search = Input.Search;

export default ({ placeholder, meta }) => {
	// <input onBlur={input.onBlur} onChange={input.onChange} />
	return (
		<div>
			<Search
				placeholder={placeholder}
				onSearch={QuestionInput}
				style={{ width: 550, marginTop: '25px' }} // 50px shows 1 char, 150px => 20 char
			/>{' '}
			<div style={{ marginBottom: '5px' }}>
				{meta.touched && meta.error}
			</div>
		</div>
	);
};
