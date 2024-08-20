import axios from "axios";

export const request = axios.create({
    // API 请求的默认前缀
    baseURL: `/api/mp`,

    // 请求超时时间
    timeout: 2 * 60 * 1000, // 2分钟
    headers: {
        "Content-Type": "application/json",
    },
});

export type NotionUser = {
    id: string;
    name: string;
    avatar: string;
    email: string;
    unionid: string;
    access_token: string;
}

export async function getUserInfo(unionid: string) {
    const user_resp = await request
        .get("/user", { params: { unionid } })
        .then((res) => res.data);

    if (!user_resp.ok) {
        return null;
    }
    return user_resp.data as NotionUser;
}
