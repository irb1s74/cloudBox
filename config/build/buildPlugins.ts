import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { DefinePlugin, HotModuleReplacementPlugin, WebpackPluginInstance } from 'webpack'
import { BuildOptions } from './types'

export const buildPlugins = ({ isDev, paths }: BuildOptions): WebpackPluginInstance[] => {
    const plugins: WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new DefinePlugin({
            __IS_DEV__: isDev,
        }),
    ]

    if (isDev) {
    // plugins.push(new ReactRefreshPlugin())
        plugins.push(new HotModuleReplacementPlugin())
    // plugins.push(new BundleAnalyzerPlugin({
    //     openAnalyzer: false,
    // }));
    }
    return plugins
}
