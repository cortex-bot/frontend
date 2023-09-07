module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.resolve.extensions.push('.tsx');
        webpackConfig.resolve.extensions.push('.ts');
        return webpackConfig;
      },
    },
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }