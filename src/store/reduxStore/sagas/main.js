import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { fetchSubmit, fetchQuery, fetchDelete } from "api/main";
import * as Types from "reduxStore/actionTypes";
import dayjs from "dayjs";

const REDUX = "redux";

function* submit() {
  try {
    const { title, desc } = (yield select()).main;
    const params = {
      title,
      desc,
      createTime: dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
    };
    yield put({ type: Types.MAIN_FETCH_SUBMIT_START_TYPE });
    const data = yield call(() => fetchSubmit(params, REDUX));
    if (data) {
      yield put({ type: Types.MAIN_ADD_HISTORY_TYPE, data: params });
    }
  } catch (e) {
  } finally {
    yield put({ type: Types.MAIN_FETCH_SUBMIT_END_TYPE });
  }
}

function* query() {
  try {
    yield put({ type: Types.MAIN_FETCH_QUERY_START_TYPE });
    const data = yield call(() => fetchQuery(REDUX));
    if (data) {
      yield put({ type: Types.MAIN_UPDATE_HISTORY_TYPE, data });
    }
  } catch (e) {
  } finally {
    yield put({ type: Types.MAIN_FETCH_QUERY_END_TYPE });
  }
}

function* remove(action) {
  try {
    const { data: index } = action;
    const params = { index };
    const data = yield call(() => fetchDelete(params, REDUX));
    if (data) {
      yield put({ type: Types.MAIN_REMOVE_HISTORY_TYPE, data: index });
    }
  } catch (e) {}
}

function* mainSaga() {
  /**
   * saga自带解决状态竞争的机制，可以避免重复点击导致的状态与期望不一致的问题
   * 状态与期望不一致的场景，比如，短时间多次点击请求，因为网络原因，第一次请求比第二次请求慢返回，导致后返回的旧状态反而覆盖了新状态
   * takeLatest: 多次重复dispatch action，只有最新的一次action有效
   * takeEvery: 每次dispatch action都有效，会有状态竞争问题
   */
  yield takeLatest(Types.MAIN_FETCH_SUBMIT_TYPE, submit);
  yield takeLatest(Types.MAIN_FETCH_QUERY_TYPE, query);
  yield takeLatest(Types.MAIN_FETCH_REMOVE_TYPE, remove);
}

export default mainSaga;
