import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/main.scss";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { LOAD_USER_REQUEST } from "../reducers/user";
import store from "../store";

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

export default withRedux(store)(withReduxSaga(Index));
