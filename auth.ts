import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface User {
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "wechat",
      credentials: {
        wx_id: { label: "WeChat ID", type: "text" },
      },
      authorize: async (credentials) => {
        let user: User | null = null
        if (typeof credentials.wx_id === "string" && credentials.wx_id.length > 0) {
          user = {
            id: credentials.wx_id,
            name: `微信用户${credentials.wx_id.slice(-4)}`,
          }
        }

        console.log("authorize: user", JSON.stringify(user, null, 2));

        if (!user) {
          throw new Error("User not found.")
        }
        return user
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt: token", JSON.stringify(token, null, 2));
      // console.log("jwt: user", JSON.stringify(user, null, 2));

      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // console.log("session: token", JSON.stringify(token, null, 2));
      // console.log("session: session", JSON.stringify(session, null, 2));

      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  }
})