/*
 * @Author: zheng.li
 * @Date: 2021-01-20 19:55:54
 * @LastEditTime: 2021-03-06 16:05:52
 * @Description:
 * @FilePath: \my-cli\src\table.ts
 */

// This utility allows you to render unicode-aided tables on the command line from your node.js scripts.
import Table from 'cli-table'
// Chalk comes with an easy to use composable API where you just chain and nest the styles you want.
import chalk from 'chalk'

const table:any = new Table({
  head: ['Template Name', 'Owner/Name', 'Branch', 'From'],
  style: {
    head: ['green']
  }
})

export default (tplList: Array<any>, lyric?: string, autoExit: boolean = true) => {
  tplList.forEach(({ name, path, branch, from }) => {
    table.push([name, path, branch, from])
    if (table.length === tplList.length) {
      console.log(table.toString())
      if (lyric) {
        console.log(chalk.green(`\u2714 ${lyric}`))
      }
      autoExit && process.exit()
    }
  })
}

