/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json');

/** @type {import('jest').Config} */
module.exports = {
	globals: {
		'babel-jest': {
			tsConfig: 'tsconfig.json',
			diagnostics: true,
		},
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest',
	},
	moduleNameMapper: {
		...require('tsconfig-paths-jest')(tsconfig),
		'.+\\.(css|sass|scss)$': 'identity-obj-proxy',
	},
};
