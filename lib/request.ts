import axios from "axios";
import { pick } from "lodash-es";

export const request = axios.create({
  // API 请求的默认前缀
  baseURL: `/api/harvest`,

  // 请求超时时间
  timeout: 2 * 60 * 1000, // 2分钟
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error.response?.status == 401) {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = window.location.href;
      return Promise.reject(new Error("Unauthorized"));
    }
    const data = JSON.stringify(pick(error.config, ["data", "url"]), null, 2);

    fetch("/api/notify/exception", {
      method: "POST",
      body: JSON.stringify({
        error: {
          data,
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      }),
    });

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.data) {
      const resp = error.response.data;
      const err = new Error(
        resp.message ||
          `failed to fetch data. statusCode: ${error.response.status}`
      );
      return Promise.reject(err);
    }
    return Promise.reject(error);
  }
);
