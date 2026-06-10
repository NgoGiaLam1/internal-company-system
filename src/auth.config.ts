import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.tblEmployee.findUnique({
          where: {
            email: credentials.email,
          },

          include: {
            role: true,
          },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,

          name: user.fullName,

          email: user.email,

          image: user.avatarUrl,

          phone: user.phone,

          position: user.position,

          role: user.role.name,

          departmentId: user.departmentId,

          status: user.status,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;

        token.role = (user as any).role;

        token.phone = (user as any).phone;

        token.position = (user as any).position;

        token.departmentId = (user as any).departmentId;

        token.status = (user as any).status;

        token.picture = user.image;
      }

      if (trigger === "update" && session) {
        if ((session as any).name !== undefined) {
          token.name = (session as any).name;
        }

        if ((session as any).phone !== undefined) {
          token.phone = (session as any).phone;
        }

        if ((session as any).image !== undefined) {
          token.picture = (session as any).image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;

        (session.user as any).role = token.role;

        (session.user as any).phone = token.phone;

        (session.user as any).position = token.position;

        (session.user as any).departmentId = token.departmentId;

        (session.user as any).status = token.status;

        session.user.image = token.picture as string;
      }

      return session;
    },
  },
};
