const { atom, selector } = require("recoil");

export const titleState = atom({
  key: "mainTitle",
  default: "recoil",
});

export const descState = atom({
  key: "mainDesc",
  default:
    "使用 Recoil 会为你创建一个数据流向图，从 atom（共享状态）到 selector（纯函数），再流向 React 组件。Atom 是组件可以订阅的 state 单位。selector 可以同步或异步改变此 state。",
});

export const derivedFromTitleState = selector({
  key: "mainDerivedFromTitle",
  get: ({ get }) => {
    const title = get(titleState);
    if (typeof title === "string") {
      return `字数${title.length}`;
    } else {
      console.error(
        `usederivedFromTitle require type is string but got ${typeof title}`
      );
      return "";
    }
  },
});

export const derivedFromDescState = selector({
  key: "mainDerivedFromDesc",
  get: ({ get }) => {
    const desc = get(descState);
    if (typeof desc === "string") {
      return `字数${desc.length}`;
    } else {
      console.error(
        `usederivedFromDesc require type is string but got ${typeof desc}`
      );
      return "";
    }
  },
});

export const submitLoadingState = atom({
  key: "mainSubmitLoading",
  default: false,
});

export const queryLoadingState = atom({
  key: "mainQueryLoading",
  default: false,
});

export const historyState = atom({
  key: "mainHistory",
  default: [],
});

export const currentIndexState = atom({
  key: "mainCurrentIndex",
  default: null,
});
