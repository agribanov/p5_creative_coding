import { globbySync } from 'globby';
import path from 'path';

const dirs = globbySync(['*/index.html'], { cwd: 'src' }).map(
    (p) => path.parse(p).dir
);

const entries = {};
const htmlPlugins = [];

dirs.forEach((dir) => {
    entries[path.join(dir, 'index.js')] = path.join('src', dir, 'index.ts');
    htmlPlugins.push({
        filename: path.join(dir, 'index.html'),
        template: path.join('src', dir, 'index.html'),
        inject: false,
    });
});
console.log(dirs, entries, htmlPlugins);
