import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';
import { terser } from "rollup-plugin-terser";

export default {
    input   : 'src/index.js',
    output  : [
        { name: 'yarrr', format: 'es', file: 'dist/bundle.es.js' },
        { name: 'yarrr', format: 'umd', file: 'dist/bundle.umd.js' },
    ],
    plugins: [
        async(),
        babel({
            exclude: 'node_modules/**',
        }),
        terser(),
    ],
}