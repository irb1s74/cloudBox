import {BuildOptions} from './types';
import {Configuration} from 'webpack-dev-server';

export const buildDevServer = ({port}: BuildOptions): Configuration => {
    return {
        port,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}
