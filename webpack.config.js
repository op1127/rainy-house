const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const cssNano = require('cssnano');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contentHash].js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[contentHash].css'
        }),
        new CopyPlugin([{
                from: 'src/img',
                to: 'img'
            },
            {
                from: 'src/img/favicon',
                to: 'favicon'
            },
            {
                from: 'src/models',
                to: 'models'
            },
            {
                from: 'src/textures',
                to: 'textures'
            }
        ]),
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv({
                                    autoprefixer: {
                                        grid: 'no-autoplace'
                                    }
                                }),
                                cssNano({
                                    preset: 'default',
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass'),
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img'
                    }
                }
            }
        ]
    },
    devtool: 'source-map'
};