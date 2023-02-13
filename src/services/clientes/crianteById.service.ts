import { AppError } from "../../../errors/appError";
import { AppDataSource } from "../../data-source";
import { Cliente } from "../../entities/cliente.entity";

const criateByIdService = async (id: string) => {
  const criateRepository = AppDataSource.getRepository(Cliente);

  const criateExist = await criateRepository.findOne({
    where: { id },
  });

  if (!criateExist) {
    throw new AppError(400, "Cliente ja deletado");
  }

  const users = criateRepository.findOne({ where: { id } });

  return users;
};

export default criateByIdService;
