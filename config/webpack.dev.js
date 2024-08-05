const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: 'http://localhost:7003/'
    },
    devServer: {
      headers: {
        'X-Frame-Options': '*'
      },
   
      port: 7003,
      historyApiFallback: true,
      liveReload: true,
      hot: true,
      proxy: [
          {
            context: ['/api/v1/admin/'],
            target: 'http://localhost:8089', 
            secure: false,
            changeOrigin: true, 
          },
        ],
  },
    plugins: [],
};

module.exports = merge(commonConfig, devConfig);
