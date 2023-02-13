import { ICriate } from "./cliente.interface";

interface IContatoCadastro {
  nome_completo: string;
  email: string;
  telefone: number;
  apelido?: string;
}

interface IContatoUpdate {
  nome_completo?: string;
  email?: string;
  telefone?: number;
  apelido?: string;
}

interface IContato {
  id: string;
  nome_completo: string;
  email: string;
  telefone: number;
  apelido?: string;
  date_creation: string;
  date_update: string;
  cliente: ICriate;
}

export { IContatoCadastro, IContatoUpdate, IContato };
