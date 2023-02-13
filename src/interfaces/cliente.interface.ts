import { IContato } from "./contato.interface";

interface ICriateCadastro {
  nome_completo: string;
  email: string;
  telefone: number;
}

interface IUpdateCriate {
  nome_completo?: string;
  email?: string;
  telefone?: number;
}

interface ICriate {
  id: string;
  nome_completo: string;
  email: string;
  telefone: number;
  date_creation: string;
  date_update: string;
  contatos: IContato[];
}

export { ICriateCadastro, IUpdateCriate, ICriate };
