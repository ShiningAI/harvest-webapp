export const SELECTD_FORMS = "FormList";
export const SELECTED_FORM = "SelectedForm";

export const WX_QRCODE =
  "https://work.weixin.qq.com/u/vceacd26d9afdfcffa?v=4.1.39.194962&bb=734e271b8a";
export const FREE_GUIDE_URL =
  "https://mp.weixin.qq.com/s/ywDlisdSv-6KVFJjOJr38g";
  export const GUIDE_URL = "https://mp.weixin.qq.com/s/bDYPTlaF770qHH4FhgRP9g";
export const HELP_URL =
  "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU4NzQwNzQzNg==&action=getalbum&album_id=3733392827078918148#wechat_redirect";

export const clientId = process.env.NOTION_OAUTH_CLIENT_ID!;
export const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET!;
export const redirectUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth/callback/notion"
    : "https://harvest.superai42.com/api/auth/callback/notion";

export const redirectUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/notion"
    : "https://harvest.superai42.com/api/notion";

export const API_NICE_URL =
  process.env.NODE_ENV === "test"
    ? "http://localhost:8000"
    : "https://nice.superai42.com/api";
export const NOTION_OAUTH_HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://harvest.superai42.com";
