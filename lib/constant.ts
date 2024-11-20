export const SELECTD_FORMS = "FormList";
export const SELECTED_FORM = "SelectedForm";

export const WX_QRCODE =
  "https://work.weixin.qq.com/u/vc7190ffe7e6076089?v=4.1.31.32492&bb=0d2c04c42b";

export const clientId = process.env.NOTION_OAUTH_CLIENT_ID!;
export const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET!;
export const redirectUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth/callback/notion"
    : "https://harvest.superai42.com/api/auth/callback/notion";

export const redirectUrl =
  process.env.NODE_ENV === "test"
    ? "http://localhost:3000/api/notion"
    : "https://harvest.superai42.com/api/notion";

export const API_NICE_URL =
  process.env.NODE_ENV === "test"
    ? "http://localhost:8000"
    : "http://api.notion-nice.com";
export const NOTION_OAUTH_HOST =
  process.env.NODE_ENV === "test"
    ? "http://localhost:3000"
    : "https://harvest.prius.ai";
