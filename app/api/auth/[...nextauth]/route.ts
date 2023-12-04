import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
            },
            async authorize(credentials, req) {
              const { email, password } = credentials as {
                email: string;
                password: string
            };

            const res = await fetch("http://localhost:3000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email,
                password
              })
            })

            const user = await res.json();

              if (user.error) {
                // Any object returned will be saved in `user` property of the JWT
                throw new Error("Coś poszło nie tak")
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return user

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          })
    ],
    callbacks: {
      async jwt({ token, user}){
        return({ ...token, ...user})
      },
      async session({ session, token}){
        session.user = token as any;
        return session
      }
    }
}

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST}