const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://52.79.89.94"
    : "http://localhost:8080";

export const backendURL = backUrl;
