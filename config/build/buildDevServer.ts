import {Configuration} from 'webpack-dev-server';
import {BuildOptions} from './types';

export const buildDevServer = ({port}: BuildOptions): Configuration => ({
        port,
        open: true,
        historyApiFallback: true,
        hot: true,
    })
