import * as Types from "reduxStore/actionTypes";

const initialTitle = "redux";

const initialDesc =
  "redux是一个基于flux的数据流管理库，数据不可变，通过action定义一个数据更新的声明，dispatch后由reducer根据不同的type分发给期望的区域更新数据，期间的更新数据必须是新的引用。通过react-redux，可作为react等视图框架的状态管理库。";

const initailState = {
  title: initialTitle,
  desc: initialDesc,
  // 由title计算而来的状态
  derivedFromTitle: `字数${initialTitle.length}`,
  // 由desc计算而来的状态
  derivedFromDesc: `字数${initialDesc.length}`,
  submitLoading: false,
  queryLoading: false,
  history: [],
  currentIndex: null,
};

const mainReducer = (state = initailState, action) => {
  const data = action.data;
  let currentIndex = null,
    newHistory;
  switch (action.type) {
    case Types.MAIN_SET_TITLE_TYPE:
      return {
        ...state,
        title: data,
      };
    case Types.MAIN_SET_DESC_TYPE:
      if (typeof data === "string") {
        return {
          ...state,
          desc: data,
          derivedFromDesc: "字数" + data.length,
        };
      } else {
        console.error(
          `require type is string but got ${typeof data}, in ActionType: ${
            Types.MAIN_SET_DESC_TYPE
          }`
        );
        return state;
      }
    case Types.MAIN_FETCH_SUBMIT_START_TYPE:
      return {
        ...state,
        submitLoading: true,
      };
    case Types.MAIN_FETCH_SUBMIT_END_TYPE:
      return {
        ...state,
        submitLoading: false,
      };
    case Types.MAIN_FETCH_QUERY_START_TYPE:
      return {
        ...state,
        queryLoading: true,
      };
    case Types.MAIN_FETCH_QUERY_END_TYPE:
      return {
        ...state,
        queryLoading: false,
      };
    case Types.MAIN_ADD_HISTORY_TYPE:
      newHistory = [...state.history, data];
      currentIndex = newHistory.length - 1;
      return {
        ...state,
        history: newHistory,
        currentIndex,
        title: newHistory[currentIndex].title,
        desc: newHistory[currentIndex].desc,
      };
    case Types.MAIN_REMOVE_HISTORY_TYPE:
      newHistory = state.history.slice();
      newHistory.splice(data, 1);
      if (data < state.currentIndex) {
        currentIndex = state.currentIndex--;
      } else if (data === state.currentIndex) {
        if (state.currentIndex === 0) {
          currentIndex = null;
        } else if (state.currentIndex === state.history.length - 1) {
          currentIndex = state.currentIndex--;
        } else {
          currentIndex = state.currentIndex;
        }
      } else {
        currentIndex = state.currentIndex;
      }
      return {
        ...state,
        history: newHistory,
        currentIndex,
        title: newHistory[currentIndex]?.title || "",
        desc: newHistory[currentIndex]?.desc || "",
      };
    case Types.MAIN_SELECT_TYPE:
      if (typeof data !== "number") {
        console.error(
          `actionType '${
            Types.MAIN_SELECT_TYPE
          }' in mainReducer require type of action.data is number, but got ${typeof data}`
        );
        return state;
      }
      if (data === state.currentIndex) {
        return state;
      }
      const currentSelectedHistory = state.history[data];
      return {
        ...state,
        currentIndex: data,
        title: currentSelectedHistory.title,
        desc: currentSelectedHistory.desc,
      };
    case Types.MAIN_UPDATE_HISTORY_TYPE:
      return {
        ...state,
        history: data,
      };
    default:
      return state;
  }
};

export default mainReducer;
