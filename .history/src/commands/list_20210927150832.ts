/*
 * @Author: zheng.li
 * @Date: 2021-01-20 19:55:54
 * @LastEditTime: 2021-01-20 16:05:29
 * @Description:
 * @FilePath: \tr-cli\src\commands\list.ts
 */
import DB from '../db'
import listTable from '../table'

async function listTemplates () {
  const tplList:any = await DB.find({})

  listTable(tplList, '')
}

export default listTemplates

