import { BuildOptions } from './types'

export const buildResolvers = ({ paths }: BuildOptions) => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    }
}
