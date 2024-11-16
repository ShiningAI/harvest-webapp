const APPID = "wxae60dbd6c186d1ba";

const redirect_uri =
  process.env.NODE_ENV === "production"
    ? "https://harvest.superai42.com"
    : "http://localhost:7766";

export function genAuthUrl(state: string) {
  const authUrl = new URL(
    "https://open.weixin.qq.com/connect/oauth2/authorize"
  );
  authUrl.searchParams.set("appid", APPID);
  authUrl.searchParams.set("redirect_uri", `${redirect_uri}/api/authorize`);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "snsapi_userinfo");
  authUrl.searchParams.set("state", state);

  return authUrl.toString() + "#wechat_redirect";
}

export function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}
