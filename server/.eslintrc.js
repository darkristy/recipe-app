module.exports = {
	extends: ["sarpik"],
	rules: {
		"no-param-reassign": 0,
		"prettier/prettier": [
			"error",
			{
				singleQuote: false,
				printWidth: 80,
				useTabs: true,
			},
		],
		"react/display-name": "off",
		"no-unused-expressions": 0,
		"import/no-cycle": 0,
		"global-require": 0,
		"import/no-dynamic-require": 0,
		"class-methods-use-this": 0,
		"no-useless-constructor": 0,
		"import/order": [
			"error",
			{
				groups: [
					"builtin",
					"external",
					"internal",
					"parent",
					"sibling",
					"index",
				],
				"newlines-between": "always",
			},
		],

		"import/no-extraneous-dependencies": 0,
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/camelcase": 0,
		'indent': 0,
	},
};
