import { DefaultSession }
  from "next-auth";

declare module "next-auth" {

  interface Session {
    user: {
      id: string;

      role: string;

      phone?: string | null;

      position?: string;

      departmentId?: string | null;

      status?: string;

    } & DefaultSession["user"];
  }

  interface User {
    id: string;

    role: string;

    phone?: string | null;

    position?: string;

    departmentId?: string | null;

    status?: string;
  }
}

declare module "next-auth/jwt" {

  interface JWT {
    id: string;

    role: string;

    phone?: string | null;

    position?: string;

    departmentId?: string | null;

    status?: string;
  }

}