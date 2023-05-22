export type FormState = {
  name: string;
  email: string;
  password: string;
  phone: string;
  image: File | null;
};
export type User = {
  name: string;
  email: string;
  phone: string;
  image: string | null;
  token: string | null;
};

export type responseRegister = {
  message: string;
  token: string;
};

export type responseLogin = {
  message: string;
  user: object;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};
