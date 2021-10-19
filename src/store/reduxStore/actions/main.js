import * as Types from "reduxStore/actionTypes";

export const setTitle = (newTitle) => ({
  type: Types.MAIN_SET_TITLE_TYPE,
  data: newTitle,
});

export const setDesc = (newDesc) => ({
  type: Types.MAIN_SET_DESC_TYPE,
  data: newDesc,
});

export const select = (index) => ({
  type: Types.MAIN_SELECT_TYPE,
  data: index,
});

export const submit = (params) => ({
  type: Types.MAIN_FETCH_SUBMIT_TYPE,
  data: params,
});

export const query = () => ({
  type: Types.MAIN_FETCH_QUERY_TYPE,
});

export const remove = (index) => ({
  type: Types.MAIN_FETCH_REMOVE_TYPE,
  data: index,
});
