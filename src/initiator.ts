import { Download, DownloadResult } from "./types"
import chalk from 'chalk'
import ora from 'ora'

const download = require('download-git-repo')
const ncp = require('ncp').ncp
const spinner = ora('Downloading template...')

const doDownload = (from:string, dist:string):Promise<DownloadResult> => {
  console.log(`from: ${from}\n`)
  spinner.start()
  return new Promise((resolve, reject) => {
    download(from, dist, err => {
      if (err) {
        spinner.fail()
        reject({
          status: 0,
          msg: err
        })
      }
      spinner.stop()
      resolve({
        status: 1,
        msg: `New project has been initialized successfully! \n Locate in \n${dist}`
      })
    })
  })
}

const doCopy = (from:string, dist:string):Promise<DownloadResult> => {
  console.log(from, dist)
  spinner.start()
  return new Promise((resolve, reject) => {
    ncp(from, dist, err => {
      if (err) {
        reject({
          status: 0,
          msg: err
        })
      }
      spinner.stop()
      resolve({
        status: 1,
        msg: `New project has been initialized successfully! Locate in \n${dist}`
      })
    })
  })
}

const initiator = async ({ path, branch, from, dist }: Download) => {
  let result:DownloadResult
  // 内网 gitLab 地址，直接下载zip包
  // https://www.npmjs.com/package/download-git-repo
  let dlFrom = `direct:${path}/repository/archive.zip`
  result = await doDownload(dlFrom, dist)
  console.log(result.status ? chalk.green(result.msg) : chalk.red(result.msg))
}

export default initiator

