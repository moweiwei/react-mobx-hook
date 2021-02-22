# Frontend Boilerplate with React, MobX & TypeScript

A bare minimum react-mobx-webpack-typescript boilerplate with TodoMVC example.

Note that this project does not include **Server-Side Rendering**, **Testing Frameworks** and other stuffs that makes the package unnecessarily complicated.

Ideal for creating React apps from the scratch.

See also: [react-redux-typescript-boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate)

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 3.8
- [x] [React](https://facebook.github.io/react/) 16.13
- [x] [React Router](https://github.com/ReactTraining/react-router) 5
- [x] [Mobx](https://github.com/mobxjs/mobx) 5
- [x] [Mobx React](https://github.com/mobxjs/mobx-react) 6
- [x] [TodoMVC example](http://todomvc.com)

### Build tools

- [x] [Webpack](https://webpack.github.io) 5
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [Less Loader](https://www.npmjs.com/package/less-loader)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)
- [x] [copy-webpack-plugin ](https://github.com/webpack-contrib/copy-webpack-plugin)
- [x] [webpackbar](https://github.com/nuxt-contrib/webpackbar) 显示编译进度

## Setup

```
$ yarn install
```

## Running

```
$ yarn start
```

## Build

```
$ yarn build
```

## Code Format

Prettier 就是帮你统一项目风格.

```
$ yarn prettier
```

## ESLint

包括 `lint-eslint` 和 `lint-stylelint`,分别对 js,ts,tsx 和 less,css,scss 进行 lint 检查。

```
$ yarn lint
```

## lint-staged

lint-staged 只对我们 git 缓存区最新改动过的文件进行以上的格式化和 lint 规则校验。
通过工具 husky ，它会提供一些钩子，比如执行 git commit 之前的钩子 pre-commit ，借助这个钩子我们就能执行 lint-staged 所提供的代码文件格式化及 lint 规则校验！

## commitlint 和 changelog

[commitlint](https://github.com/conventional-changelog/commitlint) 可以帮助我们进行 git commit 时的 message 格式是否符合规范。conventional-changelog 可以帮助我们快速生成 changelog。

```
/**
 * build : 改变了build工具 如 webpack
 * ci : 持续集成新增
 * chore : 构建过程或辅助工具的变动
 * feat : 新功能
 * docs : 文档改变
 * fix : 修复bug
 * perf : 性能优化
 * refactor : 某个已有功能重构
 * revert : 撤销上一次的 commit
 * style : 代码格式改变
 * test : 增加测试
 * anno: 增加注释
 */
```

```
$ yarn changelog
```

## 推荐两个 hooks 库

- [react-use](https://github.com/streamich/react-use)
- [ahooks](https://github.com/alibaba/hooks)

# License

MIT
