export default [
	{
		label: 'United States',
		value: 'country',
		key: 'United States',
		children: [
			{
				label: 'Hawaii',
				value: 'Hawaii',
				key: 'Hawaii',
				UTC_offset: -10
			},
			{ label: 'Alaska', value: 'Alaska', key: 'Alaska', UTC_offset: -9 },
			{
				label: 'Pacific',
				value: 'US-Pacific',
				key: 'US-Pacific',
				UTC_offset: -8
			},
			{
				label: 'Mountain',
				value: 'US-Mountain',
				key: 'US-Mountain',
				UTC_offset: -7
			},
			{
				label: 'Central',
				value: 'US-Central',
				key: 'US-Central',
				UTC_offset: -6
			},
			{
				label: 'Eastern',
				value: 'US-Eastern',
				key: 'US-Eastern',
				UTC_offset: -5
			}
		]
	},
	{
		label: 'Canada',
		value: 'country',
		key: 'Canada',
		children: [
			{
				label: 'Pacific',
				value: 'C-Pacific',
				key: 'C-Pacific',
				UTC_offset: -8
			},
			{
				label: 'Mountain',
				value: 'C-Mountain',
				key: 'C-Mountain',
				UTC_offset: -7
			},
			{
				label: 'Central',
				value: 'C-Central',
				key: 'C-Central',
				UTC_offset: -6
			},
			{
				label: 'Eastern',
				value: 'C-Eastern',
				key: 'C-Eastern',
				UTC_offset: -5
			},
			{
				label: 'Atlantic',
				value: 'Atlantic',
				key: 'Atlantic',
				UTC_offset: -4
			},
			{
				label: 'Newfoundland',
				value: 'Newfoundland',
				key: 'Newfoundland',
				UTC_offset: -3.5
			}
		]
	},
	{
		label: 'Europe',
		value: 'country',
		key: 'Europe',
		children: [
			{ label: 'BST', value: 'BST', key: 'BST', UTC_offset: 1 },
			{ label: 'CEST', value: 'CEST', key: 'CEST', UTC_offset: 2 },
			{ label: 'CET', value: 'CET', key: 'CET', UTC_offset: 1 },
			{ label: 'EEST', value: 'EEST', key: 'EEST', UTC_offset: 3 }
		]
	}
];
