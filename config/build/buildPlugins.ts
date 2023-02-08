import { DefinePlugin, HotModuleReplacementPlugin, WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions } from './types';

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
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: true,
        // })
    ];

    if (isDev) {
        plugins.push(new ReactRefreshPlugin());
        plugins.push(new HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: true,
        }));
    }
    return plugins;
};
