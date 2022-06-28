const path = require('path');

const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

const mode = "development";

module.exports = {
    entry: [
        path.resolve(__dirname, './src/index.tsx')
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },{
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true
    },
    mode,
    devServer: {
        port: 3002,
        historyApiFallback: true,
        hot: true,
        static: './dist'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './static/index.html')
        })
    ]
}