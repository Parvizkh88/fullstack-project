export type UserType = {
  name: string;
  email: string;
  password: string;
  // image: string;
  phone: string;
  is_admin: number;
  is_verified: number;
  createdAt: Date;
  isBanned: number;
};
export type DecodedToken = {
  name: string;
  email: string;
  phone: string;
  hashedPassword: string;
  is_admin: number;
  is_verified: number;
  createdAt: Date;
  isBanned: number;
};
