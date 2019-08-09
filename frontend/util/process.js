const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.pastweathercrawler.tk/"
    : "http://localhost:8080";

export const backendURL = backUrl;
