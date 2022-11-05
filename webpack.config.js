import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import { globbySync } from 'globby';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = 'style-loader';

const dirs = globbySync(['*/index.html'], { cwd: 'src' }).map(
    (p) => path.parse(p).dir
);

const entries = {};
const htmlPlugins = [];

dirs.forEach((dir) => {
    entries[path.join(dir, 'index')] = '.' + path.join('/src', dir, 'index.ts');

    htmlPlugins.push(
        new HtmlWebpackPlugin({
            filename: path.join(dir, 'index.html'),
            template: path.join('.', 'src', dir, 'index.html'),
            inject: false,
        })
    );
});

const config = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '',
    },
    devServer: {
        static: true,
        open: true,
        host: 'localhost',
        historyApiFallback: {
            disableDotRule: true,
        },
    },
    plugins: [
        ...htmlPlugins,

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
