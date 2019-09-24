const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const uglifyjs = require('uglifyjs-webpack-plugin')

const config = {
    externals: {
        'vue': {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['.js', '.jsx', '.vue', '.md'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    safe: true,
                    autoprefixer: { disable: true },
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
        ]
    },
    mode: 'production',
    entry: {
        "ysz-ui": './ysz-ui.js', 
        "ysz-weui": './ysz-weui.js'},
    output: {
        path: path.resolve(__dirname, process.env.NODE_ENV == 'pro' ? 'lib' : 'test'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader'},
            {
                test: /\.js$/, 
                use: 'babel-loader', 
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "ysz-ui.js"),
                    path.resolve(__dirname, "ysz-weui.js"),
                ],
            },
            {
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                'postcss-loader',
                "sass-loader",
            ]}
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new uglifyjs({
            exclude: /\.min\.js$/,
            cache: true,
            parallel: true,
            sourceMap: false,
            extractComments: false,
            uglifyOptions: {
                compress: {
                    unused: true,
                    warnings: false,
                    drop_debugger: true
                },
                output: {
                    comments: false
                }
            }
        })
    ]
};

module.exports = config;