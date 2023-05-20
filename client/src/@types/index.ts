export type  User= {
  name: string;
  email: string;
  password: string;
  phone: string;
  // image: string;
}

export type responseRegister = {
  message: string;
  token: string;
};

export type responseLogin = {
  message: string;
  user: object;
};
