import { AppError } from "../../../errors/appError";
import { AppDataSource } from "../../data-source";
import { Contatos } from "../../entities/contatos.entity";

const contatosByIdService = async (id: string) => {
  const contatosRepository = AppDataSource.getRepository(Contatos);

  const contatosExist = await contatosRepository.findOne({
    where: { id },
  });

  if (!contatosExist) {
    throw new AppError(400, "Contatos ja deletado");
  }

  const users = contatosRepository.findOne({ where: { id } });

  return users;
};

export default contatosByIdService;
