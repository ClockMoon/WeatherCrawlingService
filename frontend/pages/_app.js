import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/main.scss";
import withRedux from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const Index = ({ Component, store }) => {
  toast.configure({
    autoClose: 2000,
    draggable: false
  });
  return (
    <Provider store={store}>
      <Head>
        <title>날씨크롤러</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.7/antd.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.7/antd.js" />
      </Head>
      <Layout>
        <Component />
      </Layout>
    </Provider>
  );
};

export default withRedux((initialState, options) => {
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
  sagaMiddleware.run(rootSaga);
  return store;
})(Index);
