import PubSub from "@/lib/PubSub";

const EXEC_TIMEOUT = 30 * 1000;

export const closeModal = () => {
  window.parent.postMessage({ s: "notion-harvest", type: "closeModal" }, "*");
};

export const updateHeight = (height: number) => {
  window.parent.postMessage(
    { s: "notion-harvest", type: "updateHeight", value: height },
    "*"
  );
};

export const getWebContent = exec_timeout(
  "[getWebContent]请求数据超时",
  async () => {
    return new Promise<{ title: string; url: string; content: string }>(
      (resolve, reject) => {
        PubSub.sub("getWebContent", (res) => {
          if (res.ok) {
            setTimeout(() => {
              resolve(res.data);
            }, 300);
          } else {
            const err: any = Error(res.error || "请求数据失败");
            err.code = res.code;
            reject(err);
          }
        });

        window.parent.postMessage(
          { s: "notion-harvest", type: "getWebContent" },
          "*"
        );
      }
    );
  }
);

function exec_timeout<T, P extends Array<any>>(
  errMsg: string,
  function_call: (...agrs: P) => Promise<T>
) {
  return _exec_timeout(errMsg, EXEC_TIMEOUT, function_call);
}

function _exec_timeout<T, P extends Array<any>>(
  errMsg: string,
  timeout: number,
  function_call: (...agrs: P) => Promise<T>
) {
  return (...agrs: P) =>
    new Promise<T>((resolve, reject) => {
      let timer: number | null = window.setTimeout(() => {
        if (timer) {
          window.clearTimeout(timer);
          timer = null;
          let params = "";
          try {
            if (agrs.length > 0) {
              params = JSON.stringify(agrs);
            }
          } catch (error) {
            console.error(error);
          }
          console.error(params ? `[${errMsg}]${params}` : errMsg);
          const e = new Error(errMsg);
          e.name = "TIMEOUT";

          reject(e);
        }
      }, timeout);

      function_call(...agrs)
        .then((ret) => {
          if (timer) {
            resolve(ret);
            window.clearTimeout(timer);
            timer = null;
          }
        })
        .catch((err: Error) => {
          if (timer) {
            window.clearTimeout(timer);
            timer = null;

            reject(err);
          }
        });
    });
}
