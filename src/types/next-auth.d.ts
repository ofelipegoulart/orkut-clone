import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      name: string;
      email: string;
      jwt: string;
      onboarded: boolean;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    jwt: string;
    onboarded: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    jwt: string;
    onboarded: boolean;
  }
}
