/*
 * @Author: zheng.li
 * @Date: 2021-01-20 19:55:54
 * @LastEditTime: 2021-03-03 16:53:04
 * @Description:
 * @FilePath: \my-cli\src\commands\init.ts
 */
import { prompt } from 'inquirer'
import DB from '../db'
import listTable from '../table'
import initiator from '../initiator'

async function initTemplate (path, branch) {
  const tplList:any = await DB.find({})
  listTable(tplList, '', false)

  const questions = [{
    type: 'rawlist',
    name: 'tplName',
    message: 'Select a template:',
    choices: () => tplList.map(tpl => {
      return {
        name: tpl.name,
        value: tpl.name,
      }
    })
  }, {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    default: (lastAnswer) => {
      return lastAnswer.tplName
    }
  }]

  prompt(questions).then(async ({ tplName, project }) => {
    const tpl = tplList.filter(({ name }) => name === tplName)[0]
    const { path, branch, from }:any = tpl
    const pwd = process.cwd()
    console.log(tpl)
    // console.log('=========')
    console.log(pwd)
    initiator({ path, branch, from, dist: `${pwd}/${project}` })
  })
}

export default initTemplate
