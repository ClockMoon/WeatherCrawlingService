import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/main.scss";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import Axios from "axios";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Index = ({ Component, store }) => {
  toast.configure({
    autoClose: 5000,
    draggable: true
  });
  return (
    <Provider store={store}>
      <Head>
        <title>날씨크롤러</title>
        <link rel="shortcut icon" href="../static/img/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.7/antd.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.7/antd.js" />
        {process.env.NODE_ENV === "production" && (
          <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
        )}
      </Head>
      <Layout>
        <Component />
      </Layout>
    </Provider>
  );
};

Index.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  const user = ctx.store.getState().user.user;
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if (ctx.isServer && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }
  if (!user) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    });
  }
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }
  return { pageProps };
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
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
})(withReduxSaga(Index));
