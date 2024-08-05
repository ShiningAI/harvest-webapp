import { request } from "./request";

export async function getAccessToken(wx_user_id: string) {
    const user_resp = await request
        .post("/get_user", { wx_user_id })
        .then((res) => res.data);

    if (!user_resp.ok) {
        return null;
    }
    return user_resp.data.access_token as string;
}
