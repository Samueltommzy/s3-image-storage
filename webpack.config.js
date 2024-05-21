const path = require('path');
const webpack = require('webpack');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: slsw.lib.entries,
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js'
    },
    target: 'node',
    mode: 'development',
    externals: [
        nodeExternals({
            modulesFromFile: {
                exclude: [
                    '@aws-sdk/client-s3',
                    '@aws-sdk/s3-request-presigner',
                    '@aws-sdk/lib-storage'
                ]
            }
        })
    ]
}
