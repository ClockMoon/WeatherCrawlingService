import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/main.scss";
const Index = ({ Component }) => {
  return (
    <div>
      <Head>
        <title>날씨크롤러</title>
      </Head>
      <Layout>
        <Component />
      </Layout>
    </div>
  );
};

export default Index;
