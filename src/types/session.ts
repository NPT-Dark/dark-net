export type SessionType = {
  user?: {
    id: string;
    email: string;
    displayName: string;
    username: string;
    profileImage: string;
  };
} | null;
