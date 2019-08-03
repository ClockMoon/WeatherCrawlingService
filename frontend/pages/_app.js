import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/main.scss";
import withRedux from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
const Index = ({ Component, store }) => {
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
  const middlewares = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  );
  const store = createStore(reducer, initialState, enhancer);
  return store;
})(Index);
