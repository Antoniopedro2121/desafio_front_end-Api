import * as express from "express";
import { ICriateCadastro } from "../../interfaces/cliente.interface";
import { IContatoCadastro } from "../../interfaces/contato.interface";
import { ICreateUser } from "../../interfaces/user.interfaces";

declare global {
  namespace Express {
    interface Request {
      ITokenInfo: {
        id: string;
      };
      userCreateValidate: ICreateUser;
      crianteCadastroValidator: ICriateCadastro;
      contatoCadastroValidator: IContatoCadastro;
    }
  }
}
