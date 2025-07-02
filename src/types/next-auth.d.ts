// ✅ Bắt buộc
export {};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      displayName: string;
      profileImage: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    displayName: string;
    profileImage: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    email: string;
    username: string;
    displayName: string;
    profileImage: string;
  }
}
