/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-03-24 20:49:07
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-22 09:57:11
 * @FilePath: /rollup-starter-lib/rollup.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: {
			name: 'main',
			file: pkg.browser,
			format: 'umd',
			globals: {
				axios: 'axios' // 指定全局变量名
			}
		},
		external: ['axios'],
		plugins: [
			resolve(), // so Rollup can find `ms`
			babel({
				babelHelpers: 'bundled',
				exclude: [
					'node_modules/**',
					'src/src/**'
				], // 只转译源码
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}),
			// commonjs(), //
			//  so Rollup can convert `ms` to an ES module

		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/main.js',
		external: ['ms', 'axios'],
		output: [
			{
				file: pkg.main, format: 'cjs',
				globals: {
					axios: 'axios' // 指定全局变量名
				}
			},
			{
				file: pkg.module, format: 'es',
				globals: {
					axios: 'axios' // 指定全局变量名
				}
			}
		],
		plugins: [
			resolve(), // so Rollup can find `ms`
			babel({
				babelHelpers: 'bundled',
			}),
		]
	}
];
