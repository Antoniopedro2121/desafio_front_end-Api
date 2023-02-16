import { AppError } from "../../../errors/appError";
import { AppDataSource } from "../../data-source";
import { Cliente } from "../../entities/cliente.entity";
import { Contatos } from "../../entities/contatos.entity";

const contatosByClienteService = async (id: string) => {
  const contatosRepository = AppDataSource.getRepository(Contatos);

  const criateRepository = AppDataSource.getRepository(Cliente);

  const clientelValid = await criateRepository.findOne({
    where: { id },
  });

  if (!clientelValid) {
    throw new AppError(400, "Cliente não encontrado");
  }

  return clientelValid.contatos;
};

export default contatosByClienteService;
