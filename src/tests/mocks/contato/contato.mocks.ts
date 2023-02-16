interface IContatoCadastro {
  nome_completo: string;
  email: string;
  telefone: number;
  apelido?: string;
}

export const contatoCadastro: IContatoCadastro = {
  nome_completo: "@@@@@@@@@@@",
  email: "a@2asa",
  telefone: 121,
  apelido: "pça",
};

export const contatoCadastro2: IContatoCadastro = {
  nome_completo: "Nome 2",
  email: "a@2asa",
  telefone: 121,
  apelido: "pça",
};

export const contatoCadastro3: IContatoCadastro = {
  nome_completo: "Nome 3",
  email: "a@2asa",
  telefone: 121,
  apelido: "pça",
};
