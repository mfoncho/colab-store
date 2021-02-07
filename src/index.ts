export * from "./actions/types";
export * from  "./hooks";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import reducers, { RootState } from "./reducers";

export type State = typeof RootState;

const sagaMiddleware = createSagaMiddleware();

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
    : (c: any) => c;

const middlewares = applyMiddleware(sagaMiddleware);

const enhancers = compose(middlewares, devTools);

const store = createStore(reducers, RootState, enhancers);

sagaMiddleware.run(sagas);

export type Store = typeof store;

export const dispatch = store.dispatch;

export default store;
