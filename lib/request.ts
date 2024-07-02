import axios from "axios";

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
  function (error) {
    console.log("request error", error);

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
