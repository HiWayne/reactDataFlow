import { lazy } from "react";

// 函数式编程，函数柯里化
const createDelay =
  (mills = 2000) =>
  (_import) =>
    new Promise((resolve) =>
      _import.then((data) =>
        setTimeout(() => {
          resolve(data);
        }, mills)
      )
    );

// 让import延迟1000ms返回，方便观察loading状态
const delay = createDelay(1000);

const IndexPage = lazy(() => delay(import("pages/IndexPage")));
const MobxPage = lazy(() => delay(import("pages/MobxPage")));
const ReduxPage = lazy(() => delay(import("pages/ReduxPage")));
const ReduxToolkitPage = lazy(() => delay(import("pages/ReduxToolkitPage")));
const RecoilPage = lazy(() => delay(import("pages/RecoilPage")));

const routes = [
  {
    path: "/",
    component: IndexPage,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/mobx",
    component: MobxPage,
    meta: {
      title: "mobx",
    },
  },
  {
    path: "/redux",
    component: ReduxPage,
    meta: {
      title: "redux",
    },
  },
  {
    path: "/toolkit",
    component: ReduxToolkitPage,
    meta: {
      title: "redux-toolkit",
    },
  },
  {
    path: "/recoil",
    component: RecoilPage,
    meta: {
      title: "recoil",
    },
  },
];

export default routes;
