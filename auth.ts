// // import NextAuth from "next-auth";
// // import Google from "next-auth/providers/google";
// // export const { handlers, signIn, signOut, auth } = NextAuth({
// //   providers: [Google],
// // });
// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { eq } from "drizzle-orm";
// import { db } from "@/app/db";
// import { users } from "@/app/db/schema/schema";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, signIn, signOut, auth } = NextAuth({ 
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),
//      Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//       },
//       authorize: async (credentials:any) => {
//         const user = null;
//         // logic to salt and hash password
//         // logic to verify if the user exists
//         if (!user) {
//           // No user found, so this is their first attempt to login
//           // Optionally, this is also the place you could do a user registration
//           throw new Error("Invalid credentials.");
//         }
 
//         // return user object with their profile data
//         return user;
//       },
//     })
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       try {
//         if (!user.email) return false;
//         const existingUser = await db
//           .select()
//           .from(users)
//         .where(eq(users.email, user.email))
//           .limit(1);

//         if (existingUser.length === 0) {
//           await db.insert(users).values({
//             email: user.email,
//             phoneNumber: null, // Google basic sign-in usually won't give phone
//             passwordHash: null, // OAuth login
//             isActive: true,
//             lastLogin: new Date(),
//             createdAt: new Date(),
//           });
//         } else {
//           await db
//             .update(users)
//             .set({
//               lastLogin: new Date(),
//               isActive: true,
//             })
//             .where(eq(users.email, user.email));
//         }

//         return true;
//       } catch (error) {
//         console.error("Error saving Google user:", error);
//         return true;
//       }
//     },

//      async session({ session }) {
//       return session;
//     },
//   },
// });

// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";

import { db } from "@/app/db";
import { users } from "@/app/db/schema/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // session: {
  //   strategy: "jwt",
  // },


  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // Credentials({
    //   name: "OTP Login",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     otp: { label: "OTP", type: "text" },
    //   },

    //   async authorize(credentials) {
    //     try {
    //       const email = credentials?.email as string | undefined;
    //       const otp = credentials?.otp as string | undefined;

    //       if (!email || !otp) {
    //         throw new Error("Email and OTP are required");
    //       }

    //       const existingUser = await db
    //         .select()
    //         .from(users)
    //         .where(eq(users.email, email))
    //         .limit(1);

    //       if (existingUser.length === 0) {
    //         throw new Error("User not found");
    //       }

    //       const user = existingUser[0];

    //       // Adjust these field names if your schema differs
    //       if (
    //         user.verificationToken !== otp ||
    //         !user.verificationTokenExpires ||
    //         new Date() > new Date(user.verificationTokenExpires)
    //       ) {
    //         throw new Error("Invalid or expired OTP");
    //       }

    //       await db
    //         .update(users)
    //         .set({
    //           verificationToken: null,
    //           verificationTokenExpires: null,
    //           isActive: true,
    //           lastLogin: new Date(),
    //         })
    //         .where(eq(users.email, email));

    //       return {
    //         id: String(user.id),
    //         email: user.email,
    //         roleId: user.roleId ?? null,
    //       };
    //     } catch (error) {
    //       console.error("Credentials authorize error:", error);
    //       throw new Error("Invalid OTP");
    //     }
    //   },
    // }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email) return false;

        // For Google login, create/update user in DB
        if (account?.provider === "google") {
          const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email))
            .limit(1);

          if (existingUser.length === 0) {
            const insertedUser = await db
              .insert(users)
              .values({
                email: user.email,
                phoneNumber: null,
                passwordHash: null,
                isActive: true,
                lastLogin: new Date(),
                createdAt: new Date(),
              })
              .returning();

            // attach id for jwt callback on first OAuth sign in
            user.id = String(insertedUser[0].id);
            (user as any).roleId = insertedUser[0].roleId ?? null;
          } else {
            await db
              .update(users)
              .set({
                lastLogin: new Date(),
                isActive: true,
              })
              .where(eq(users.email, user.email));

            user.id = String(existingUser[0].id);
            (user as any).roleId = existingUser[0].roleId ?? null;
          }
        }

        return true;
      } catch (error) {
        console.error("signIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roleId = (user as any).roleId ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        session.user.email = token.email as string;
        (session.user as any).roleId = token.roleId ?? null;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});