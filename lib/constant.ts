export const SELECTD_FORMS = "FormList";
export const SELECTED_FORM = "SelectedForm";

export const clientId = process.env.NOTION_OAUTH_CLIENT_ID!;
export const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET!;
export const redirectUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/notion/callback"
    : process.env.NOTION_OAUTH_REDIRECT_URI!;
