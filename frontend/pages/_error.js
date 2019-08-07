import React from "react";

const ErrorPage = ({ statusCode }) => {
  return (
    <div className="errorContainer">
      <div className="error">{statusCode} 페이지 오류 발생</div>
    </div>
  );
};

ErrorPage.getInitialProps = async context => {
  const statusCode = context.res
    ? context.res.statusCode
    : context.err
    ? context.err.statusCode
    : null;
  return { statusCode };
};

export default ErrorPage;
