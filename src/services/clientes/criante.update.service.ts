import { AppError } from "../../../errors/appError";
import { AppDataSource } from "../../data-source";
import { Cliente } from "../../entities/cliente.entity";
import { IUpdateCriate } from "../../interfaces/cliente.interface";

const criateUpdateService = async (
  id: string,
  { email, nome_completo, telefone }: IUpdateCriate
) => {
  const criateRepository = AppDataSource.getRepository(Cliente);

  const criateExist = await criateRepository.findOne({
    where: { id },
  });

  if (!criateExist) {
    throw new AppError(400, "Usuario ja deletado");
  }

  await criateRepository
    .createQueryBuilder()
    .update(Cliente)
    .set({
      nome_completo: nome_completo ? nome_completo : criateExist?.nome_completo,
      email: email ? email : criateExist?.email,
      telefone: telefone ? telefone : criateExist?.telefone,
    })
    .where("id = :id", { id })
    .execute();

  const findUserResp = await criateRepository.findOne({
    where: { id },
  });

  return findUserResp;
};

export default criateUpdateService;
