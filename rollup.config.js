import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import flow from 'rollup-plugin-flow-no-whitespace';
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import VuePlugin from "rollup-plugin-vue";
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

let modules = {
    yszui: {
        entry: 'ysz-ui.js',
        output: 'lib/ysz-ui.js',
        outputcss: 'lib/ysz-ui.css'
    },
    yszweui: {
        entry: 'ysz-weui.js',
        output: 'lib/ysz-weui.js',
        outputcss: 'lib/ysz-weui.css',
    }
}
export default {
    input: modules[process.env.TARGET].entry,
    output: {
        file: modules[process.env.TARGET].output,
        format: 'umd',
        name: 'maxiloVue',
    },
    external: ['vue'],
    plugins: [
        flow(),
        VuePlugin({
            compileTemplate: true,
            css: false,
            normalizer : '~vue-runtime-helpers/dist/normalize-component.js'
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
        }), 
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        resolve(),
        commonjs(), 
        postcss({
            plugins: [cssnano],
            minimize: true,
            extract: modules[process.env.TARGET].outputcss
        }),
        uglify()
    ],
}