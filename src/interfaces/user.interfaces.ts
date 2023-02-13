interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

interface IUpdateUser {
  email?: string;
  password?: string;
  name?: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface ITokenInfo {
  id: string;
}

export { ICreateUser, ILogin, ITokenInfo, IUpdateUser };
