# React 状态管理方案演示 Demo

本项目献给喜欢 react 的新手们

项目里演示了 **redux+redux-saga**、**mobx**、**redux-toolkit**、**recoil** 的使用

主要用它们实现了相同的 redo/undo 逻辑

## 谈一谈个人对以上数据流管理方案的理解和看法

1. redux 强制数据不变性，贴合 react 的设计，一定程度上避免了一些场景下副作用带来的复杂度。但随之而来的是维持 immutable 所带来的心智负担。而且因为自身的设计，模板代码较多，不适合小型简单项目。同时因为 immutable，丢失了被修改状态的信息，只能全量 render，通过 selector 的结果来确定哪些组件真的要更新。所以 react-redux 的 listener 中收集的所有被 connect 的组件都会重新执行 selector，导致性能上的不完美。

2. mobx 使用了类似 vue 的数据劫持原理，天然的知道谁使用了状态，可以在状态更新后，精确的更新依赖它的组件。性能上相比 redux 类的库更有优势。class 的书写方式容易让人倾向于以 ddd 的思想写出领域模型，比较适合复杂项目的开发。有一个缺点是，由于是数据是 mutable 的，所以无法像 redux 一样做时间回溯。

3. redux-toolkit 是一个 redux 的工具集。少了很多模板代码，内部使用了 immer.js，可以用 mutable 的方式输出 immutable 的值，使用起来方便非常多。但是 redux 的其他缺点它依然有。

4. recoil 是 Facebook 出的状态管理库，以 atom 为状态粒度，每个小状态各自独立，与组件树呈正交关系。atom 可以看作是"共享的"state，以此来对组件共用的状态进行管理。同时它还可以异步派生状态，支持 Suspense。可以用同步的代码实现原本需要多次 setState 才能实现的过渡逻辑。它可以看作是个共享的 useState，同时有异步派生的能力。但是它更多的是 state 和 setState，没有更多的功能，比如像 redux-saga 那样有解决状态竞争（关于状态竞争，可以看项目中 sagas/main.js 文件的注释）等机制的功能，需要自己实现。

## 项目目的

1. 这些库的官方文档中只展示了简单的 curd 逻辑，并且可能只有部分代码片段，完整上下文的使用示例在文档中也许并不容易找到，对于新手可能会造成困扰

2. 将这些库平行的实现相同的业务逻辑，可以直观的比较出每个状态管理库的代码量和心智负担

## 项目介绍

一、执行

`node >= 12.0.0`

`npm install`

`npm run start`

二、详细目录介绍

store 全部存放在`/src/store/*`目录中

> `/src/store/redux` -> redux store

> `/src/store/mobx` -> mobx store

> `/src/store/reduxToolkit` -> redux toolkit store

> `/src/store/recoil` -> recoil store

> `/src/components` -> 组件

> `/src/pages` -> 页面级组件

> `/src/shared` -> 复用的样式、js、hooks 等

> `/src/router` -> 路由相关

> `/src/api` -> 接口相关

## 你还可以学到

项目还用到了如下的 react 特性或生态

1. create-react-app + customize-cra + react-app-rewired。cra 的 webpack 配置没有暴露给用户，同时因为 eject 操作不可逆，所以需要这两个库重写部分定制化的 webpack 配置。具体请 Google

2. react hooks。react16+版本的特性，不必多说。因为项目比较简单，只有原生 hooks，没有用到自定义 hooks

3. react-router5 + react-router-dom

4. React.lazy + React.Suspense。组件懒加载（本项目只有路由组件），[Suspense 介绍](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html#what-is-suspense-exactly)

5. tailwind。一个 css 的模块化和复用的方案，你可以原子化、语义化的使用 className，以达到可读性高、复用 css 的目的，同时也避免了组件间样式覆盖即 css 模块化的问题（因为使用的都是原子化粒度的样式，不存在命名冲突）

6. 其他：设计上解耦路由配置和 react-router，使得其他模块也可以使用路由声明（例如首页菜单），同时解耦的路由配置也方便后期实现权限控制等业务；编写了 rem 相对单位插件；强制 node 版本控制；代码规范管理 prettier、eslint、husky、lint-staged 等

## 最后

没有万能的方案，不同的状态管理方案适合不同的场景。当你在简单场景中，千万不要第一个就想到上述的那些状态管理库。别忘了，class component 的 this.state、functional component 的 useState、useReducer 也是可以的。它们配合 context 在不复杂的场景下也能发挥出巨大的威力。

因为本项目重点在于状态管理，为了不引入更多关注点，所以没有使用 typescript 编写。有精力的人可以自己用 typescript 再实现一遍。
