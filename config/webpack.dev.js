const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:7003/'
    },
    devServer: {
        port: 7003,
        historyApiFallback: true,
        proxy:{
            "/api/v1/admin":'http://localhost:8089/',
        },

    },
    plugins: [],
}

module.exports = merge(commonConfig, devConfig);
