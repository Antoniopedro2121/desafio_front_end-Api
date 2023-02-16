import { AppDataSource } from "../../data-source";
import { AppError } from "../../../errors/appError";
import { Contatos } from "../../entities/contatos.entity";
import { Cliente } from "../../entities/cliente.entity";
import { IContatoCadastro } from "../../interfaces/contato.interface";

const contatoCreateService = async (
  { nome_completo, email, telefone, apelido }: IContatoCadastro,
  contatoId: string
) => {
  const contatoRepository = AppDataSource.getRepository(Contatos);
  const criateRepository = AppDataSource.getRepository(Cliente);

  const criateExist = await criateRepository.findOne({
    where: { id: contatoId },
  });

  if (!criateExist) {
    throw new AppError(400, "Criente não encontrado");
  }

  const newContato = new Contatos();

  newContato.nome_completo = nome_completo;
  newContato.email = email;
  newContato.telefone = telefone;
  newContato.cliente = criateExist;
  apelido !== undefined ? (newContato.apelido = apelido) : null;

  contatoRepository.create(newContato);
  await contatoRepository.save(newContato);

  return newContato;
};

export default contatoCreateService;
