![visitor badge](https://visitor-badge.laobi.icu/badge?page_id=0515my-cli.0515my-cli)

## 介绍

在实际的开发过程中，从零开始建立项目的结构是一件让人头疼的事情。众所周知 `vue-cli` , `create-react-app`, `angular-cli` 提供了相当丰富的选项和设定功能，但是其本质也是从远程仓库把不同的`模版`拉取到`本地`。

> 脚手架思路首先建立不同的模板项目，然后脚手架根据用户的指令引用模板项目初始化生成实际项目。

在熟悉了使用方法以后就开始琢磨起它们的原理，脚手架实现方式有多种，如：`vue-cli` 使用的 [Inquirer.js](https://www.npmjs.com/package/inquirer) ； 还有 [yeoman](https://yeoman.io/) 。

## 技术选型

[node.js](https://nodejs.org/)：整个脚手架工具的根本组成部分，推荐使用最新的版本。

[commander](https://github.com/tj/commander.js/)：完整的 node.js 命令行解决方案。

[download-git-repo](https://www.npmjs.com/package/download-git-repo)：从节点下载并提取一个 git 存储库（GitHub，GitLab，Bitbucket）。

[Inquirer.js](https://www.npmjs.com/package/inquirer)：常见的交互式命令行用户界面的集合。

## 整体架构

着手开发之前得先弄明白整体架构，看图：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a41fbb0627834e9ba1fae25de83b49e0~tplv-k3u1fbpfcp-watermark.image)

首先明白`模版`的概念。一个模版就是一个项目的样板，包含项目的完整结构和信息。
通过选择不同的模版，my-cli 会自动从远程仓库把相应的模板拉取到本地，完成项目的搭建。

最终整个脚手架的文件结构如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65281fa776e54031a96791b5f874db0e~tplv-k3u1fbpfcp-watermark.image)

## 功能展示

请到 [Github](https://github.com/lizheng0515/my-cli) 查看源码，欢迎`star`，谢谢！

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/262c88bf7f1544c2b26485a91246f4c4~tplv-k3u1fbpfcp-watermark.image)

- `list` | `l` 查看列表命令

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15813a178dfc46b9afacda800a024e3b~tplv-k3u1fbpfcp-watermark.image)

- `add` | `a` 添加模版命令

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85b8650b9a644d42a13637665b84644a~tplv-k3u1fbpfcp-watermark.image)

- `init` | `i` 生成项目命令
  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22215ebfca3942a2be5d9e76eed90408~tplv-k3u1fbpfcp-watermark.image)
- `delete` | `d` 删除模版命令
  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f6617a25db141c69b118b44a8a25147~tplv-k3u1fbpfcp-watermark.image)

## 入口文件

首先建立项目，在`package.json`里面写入依赖并执行`npm install`：

```json
"dependencies": {
	"chalk": "^2.4.2",
    "cli-table": "^0.3.1",
    "commander": "^2.20.0",
    "download-git-repo": "^2.0.0",
    "inquirer": "^6.5.0",
    "ncp": "^2.0.0",
    "nedb": "^1.8.0",
    "ora": "^3.4.0"
  }
```

在根目录下建立`\bin`文件夹，在里面建立一个无后缀名的`tr`文件。这个`bin\tr`文件是整个脚手架的入口文件，所以我们首先对它进行编写。

首先是一些初始化的代码：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3029cb2ef50436e9d95872c77124e64~tplv-k3u1fbpfcp-watermark.image)

> 注意：

```js
// 这行代码不能错，不能少！
#!/usr/bin/env node
```

如果你在开发`npm`包的时候，将包`link`到你的项目之后，运行包发现报错了，可能就是缺少了这句。

`/usr/bin/env`  就是告诉系统可以在`PATH`目录中查找。 配置` #!/usr/bin/env node` , 就是解决了不同的用户`node`路径不同的问题，可以让系统动态的去查找`node`来执行你的脚本文件。

从上面的架构图中可以知道，脚手架支持用户输入 4 种不同的命令。现在我们来写处理这 4 种命令的方法：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff47382ab74c4396b049548522988af6~tplv-k3u1fbpfcp-watermark.image)

> `commander`的具体使用方法可以直接到[官网](https://github.com/tj/commander.js/)去看详细的文档。

最后别忘了处理参数和提供帮助信息：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6b883fcd2a64e7c8a3bfa09f7f297c0~tplv-k3u1fbpfcp-watermark.image)

## 下载 demo

> Tip：使用 download-git-repo 下载仓库代码 demo

```js
const download = require("download-git-repo");
const path = require("path");
const dir = path.join(process.cwd(), "test");

download("direct:http://xxxx", dir, function (err) {
  console.log(err ? "Error" : "Success", err);
});
```

**核心功能**：正是从远程仓库克隆到自定义目录。

## 全局使用

为了可以全局使用，我们需要在`package.json`里面设置一下：

```json
"bin": {
    "my-cli": "bin/tr"
  },
```

本地调试的时候，在根目录下执行

```auto
npm link
```

即可把`my-cli`命令绑定到全局，以后就可以直接以`my-cli`作为命令开头。

> 整个脚手架工具已经搭建完成后，以后只需要知道模板的 git https 地址和 branch 就可以不断地往 my-cli 上面添加。

## 打包构建

这里使用到 [`rollup`](https://www.npmjs.com/package/rollup) 打包器，可以去 [官网](https://rollupjs.org/) 了解。

## 发布到 NPM

> 发布 npm 包流程可以去官网了解

```bash
// 登录npm私服
npm login --registry=http://xxx

// 账号：xxx
// 密码：******

// 发包命令
npm publish --registry=http://xxx
```

## 总结

1.  看起来并不复杂的东西，实际开始搭建也是颇费了一番心思。
2.  最大的难题是在开始的时候并不懂得如何像`npm init`那样可以一步一步地处理用户输入，只懂得一条命令行把所有的参数都带上，这样的用户体验真的很不好。
3.  研究了`vue-cli`的实现，使用上`Inquirer.js` 得以解决。
4.  这个脚手架只具备最基本的功能。

## 后续

如有必要，可持续添加一些辅助功能，如：

- 选择包管理器
- `npm` 源
- `ESlint` 是否启用
- ...
