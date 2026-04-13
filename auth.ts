// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Google],
// });
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";

import { db } from "@/app/db";
import { users } from "@/app/db/schema/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("user==========>",user);
        if (!user.email) return false;

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (existingUser.length === 0) {
          await db.insert(users).values({
            email: user.email,
            phoneNumber: null, // Google basic sign-in usually won't give phone
            passwordHash: null, // OAuth login
            isActive: true,
            lastLogin: new Date(),
            createdAt: new Date(),
          });
        } else {
          await db
            .update(users)
            .set({
              lastLogin: new Date(),
              isActive: true,
            })
            .where(eq(users.email, user.email));
        }

        return true;
      } catch (error) {
        console.error("Error saving Google user:", error);
        return true;
      }
    },

     async session({ session }) {
      return session;
    },
  },
});