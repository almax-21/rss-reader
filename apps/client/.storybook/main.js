const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'storybook-react-intl',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
	features: {
    interactionsDebugger: true,
  },
  webpackFinal: async (config) => {
		config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/"),
    };
    config.resolve.extensions.push(".ts", ".tsx");

    config.module.rules.push({
      test: /\.module\.s(a|c)ss$/,
      use: ['style-loader', {
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: '[local]_[hash:base64:5]',
					},
				},
			}, 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
			test: /\.s(a|c)ss$/,
			exclude: /\.module.(s(a|c)ss)$/,
			use: [
				'style-loader',
				'css-loader',
				'sass-loader',
			],
		});

    return config;
  },
}
