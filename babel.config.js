/*
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-22 08:51:14
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-22 09:40:44
 * @FilePath: /rollup-starter-lib/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: '> 0.25%, not dead',
      // 你可以根据实际需要添加 corejs 和 useBuiltIns
      corejs: 3,
      useBuiltIns: 'usage'
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining'
  ]
}