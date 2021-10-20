import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubmit, fetchQuery, fetchDelete } from 'api/main';
import dayjs from 'dayjs';

const REDUX_TOOLKIT = 'redux-toolkit';

export const submit = createAsyncThunk('main/submit', async (_, { getState, dispatch }) => {
  const { title, desc, history } = getState().main;
  const params = {
    title,
    desc,
    createTime: dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
  };
  const response = await fetchSubmit(params, REDUX_TOOLKIT);
  if (response) {
    dispatch({
      type: 'main/setCurrentIndex',
      payload: history.length,
    });
    dispatch({
      type: 'main/addHistory',
      payload: params,
    });
  }
});

export const query = createAsyncThunk('main/query', async () => {
  return await fetchQuery(REDUX_TOOLKIT);
});

export const remove = createAsyncThunk('main/remove', async (index, { dispatch, getState }) => {
  const params = { index };
  const result = await fetchDelete(params, REDUX_TOOLKIT);
  if (result) {
    const { currentIndex, history, title, desc } = getState().main;
    if (index === currentIndex) {
      if (currentIndex === history.length - 1) {
        const index = currentIndex === 0 ? null : currentIndex - 1;
        const data = history[index] || { title, desc };
        dispatch({
          type: 'main/setCurrentIndex',
          payload: index,
        });
        dispatch({
          type: 'main/setTitle',
          payload: data.title,
        });
        dispatch({
          type: 'main/setDesc',
          payload: data.desc,
        });
      } else {
        const index = currentIndex + 1;
        const data = history[index] || { title, desc };
        dispatch({
          type: 'main/setTitle',
          payload: data.title,
        });
        dispatch({
          type: 'main/setDesc',
          payload: data.desc,
        });
      }
    } else if (index < currentIndex) {
      dispatch({
        type: 'main/setCurrent',
        payload: currentIndex - 1,
      });
    }
    dispatch({
      type: 'main/removeHistory',
      payload: index,
    });
    return index;
  } else {
    return false;
  }
});

const initialTitle = 'redux toolkit';
const initialDesc =
  '一个官方提供用于Redux高效开发，有想法的、功能齐全的工具包。Redux工具包 致力于成为编写 Redux 逻辑的标准方式。它最初是为了帮助解决有关 Redux 的三个常见问题而创建的："配置一个 Redux store 过于复杂"、"做任何 Redux 的事情我都需要添加很多包"、"Redux 需要太多的样板代码"。我们不能解决每个用户案例，但本着 create-react-app 和 apollo-boost 的精神，我们能够尝试提供一些抽象出安装过程及处理最常见用户案例的工具，同时也包含一些会让用户简化他们代码的有用的组件。因此，该程序包的 scope 特意做了限制。它确实 没 处理比如 “可重用的封装Redux模块”，数据缓存，文件夹或文件结构，管理存储中的实体关系等概念。';

const initialState = {
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

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.title = action.payload;
      if (typeof action.payload === 'string') {
        state.derivedFromTitle = `字数${action.payload.length}`;
      } else {
        console.error(`require type is string but got ${typeof action.payload}`);
      }
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
      if (typeof action.payload === 'string') {
        state.derivedFromDesc = `字数${action.payload.length}`;
      } else {
        console.error(`require type is string but got ${typeof action.payload}`);
      }
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    addHistory: (state, action) => {
      state.history.push(action.payload);
    },
    removeHistory: (state, action) => {
      state.history.splice(action.payload, 1);
    },
    select: (state, action) => {
      state.currentIndex = action.payload;
      const { title = '', desc = '' } = state.history[action.payload] || {};
      state.title = title;
      if (typeof title === 'string') {
        state.derivedFromTitle = `字数${title.length}`;
      } else {
        console.error(`require type is string but got ${typeof title}`);
      }
      state.desc = desc;
      if (typeof desc === 'string') {
        state.derivedFromDesc = `字数${desc.length}`;
      } else {
        console.error(`require type is string but got ${typeof desc}`);
      }
    },
  },
  extraReducers: {
    [submit.pending]: (state) => {
      state.submitLoading = true;
    },
    [submit.fulfilled]: (state) => {
      state.submitLoading = false;
    },
    [submit.rejected]: (state) => {
      state.submitLoading = false;
    },

    [query.pending]: (state) => {
      state.queryLoading = true;
    },
    [query.fulfilled]: (state, action) => {
      state.queryLoading = false;
      console.log(action);
      if (action.payload) {
        state.history = action.payload;
      }
    },
    [query.rejected]: (state) => {
      state.queryLoading = false;
    },
  },
});

export const { setTitle, setDesc, select } = mainSlice.actions;

export default mainSlice.reducer;
