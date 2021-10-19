import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware)
);

sagas.forEach((saga) => sagaMiddleware.run(saga));
