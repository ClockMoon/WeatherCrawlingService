import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import reducer from "./reducers";
import { applyMiddleware, compose, createStore } from "redux";

export default (initialState, options) => {
  if (options) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer =
      process.env.NODE_ENV === "production"
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer &&
              typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
              ? window.__REDUX_DEVTOOLS_EXTENSION__()
              : f => f
          );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
  }
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
