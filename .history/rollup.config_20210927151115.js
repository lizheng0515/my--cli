/*
 * @Author: zheng.li
 * @Date: 2021-01-20 19:55:54
 * @LastEditTime: 2021-01-20 20:03:27
 * @Description:
 * @FilePath: \my-cli\src\table.ts
 */
import typescript from 'rollup-plugin-typescript'
import common from 'rollup-plugin-commonjs'

export default {
  input: './src/commands.ts',
  output: [{
    file: './dist/index.js',
    format: 'commonjs'
  }],
  plugins: [
    common(),
    typescript()
  ]
}
