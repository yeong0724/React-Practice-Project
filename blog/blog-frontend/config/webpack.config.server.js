const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
    mode: 'production',
    entry: paths.ssrIndexJs,
    target: 'node',
    output: {
        path: paths.ssrBuild,
        filename: 'server.js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: paths.publicUrlOrPath,
    },
    module: {
        rules: [
            {
                oneOf: [
                    // 자바스크립트를 위한 처리
                    // 기존 webpack.config.js 를 참고하여 작성
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: paths.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: {
                            customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides',
                            ),
                            presets: [
                                [
                                    require.resolve('babel-preset-react-app'),
                                    {
                                        runtime: 'automatic',
                                    },
                                ],
                            ],
                            plugins: [
                                [
                                    require.resolve(
                                        'babel-plugin-named-asset-import',
                                    ),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:
                                                    '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                            },
                                        },
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: false,
                        },
                    },
                    // CSS 를 위한 처리
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        //  exportOnlyLocals: true 옵션을 설정해야 실제 css 파일을 생성하지 않습니다.
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                exportOnlyLocals: true,
                            },
                        },
                    },
                    // CSS Module 을 위한 처리
                    {
                        test: cssModuleRegex,
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: {
                                exportOnlyLocals: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                        },
                    },
                    // Sass 를 위한 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 3,
                                    modules: {
                                        exportOnlyLocals: true,
                                    },
                                },
                            },
                            require.resolve('sass-loader'),
                        ],
                    },
                    // Sass + CSS Module 을 위한 처리
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve('css-loader'),
                                options: {
                                    importLoaders: 3,
                                    modules: {
                                        exportOnlyLocals: true,
                                        getLocalIdent: getCSSModuleLocalIdent,
                                    },
                                },
                            },
                            require.resolve('sass-loader'),
                        ],
                    },
                    // url-loader 를 위한 설정
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            emitFile: false, // 파일을 따로 저장하지 않는 옵션
                            limit: 10000, // 원래는 9.76KB가 넘어가면 파일로 저장하는데
                            // emitFile 값이 false 일땐 경로만 준비하고 파일은 저장하지 않습니다.
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                    // 위에서 설정된 확장자를 제외한 파일들은
                    // file-loader 를 사용합니다.
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [
                            /\.(js|mjs|jsx|ts|tsx)$/,
                            /\.html$/,
                            /\.json$/,
                        ],
                        options: {
                            emitFile: false, // 파일을 따로 저장하지 않는 옵션
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    /* - 코드에서 node_modules 내부의 라이브러리를 불러올 수 있게 설정해줌
     *   (react, react-dom/server 같은 라이브러리를 import 구문으로 불러오면 node_modules에서 찾아 사용하게 됨)
     * - 브라우저에서 사용할 때는 결과물 파일에 React library와 Application에 관한 코드가 공존해야하지만,
     *   server에서는 node_modules를 통해 바로 불어올 수 있기 때문에 굳이 결과물 파일안에 React libary가 들어 있지 않아도 됨
     * - 따라서 server를 위해 번들링할 때는 node_modules에서 불러오는 것을 제외하고 번들링 하는 것이 효율적임(webpack-node-externals 라이브러리 사용)
     * - yarn add webpack-node-externals */
    resolve: {
        modules: ['node_modules'],
    },
    externals: [
        nodeExternals({
            allowlist: [/@babel/],
        }),
    ],
    plugins: [
        new webpack.DefinePlugin(env.stringified), // 환경변수를 주입해줍니다.
    ],
};
