import { AppDataSource } from "../../data-source";
import { AppError } from "../../../errors/appError";
import { ICriateCadastro } from "../../interfaces/cliente.interface";
import { Contatos } from "../../entities/contatos.entity";
import { Cliente } from "../../entities/cliente.entity";

const contatoCreateService = async (
  { nome_completo, email, telefone }: ICriateCadastro,
  contatoId: string
) => {
  const contatoRepository = AppDataSource.getRepository(Contatos);
  const criateRepository = AppDataSource.getRepository(Cliente);

  const contatoExist = await contatoRepository.findOne({
    where: { email: email },
  });

  if (contatoExist) {
    throw new AppError(400, "E-mail ja cadastrado");
  }

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

  contatoRepository.create(newContato);
  await contatoRepository.save(newContato);

  return newContato;
};

export default contatoCreateService;
