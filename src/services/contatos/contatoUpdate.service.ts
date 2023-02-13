import { AppError } from "../../../errors/appError";
import { AppDataSource } from "../../data-source";
import { Contatos } from "../../entities/contatos.entity";
import { IContatoUpdate } from "../../interfaces/contato.interface";

const contatoUpdateService = async (
  id: string,
  { email, nome_completo, telefone, apelido }: IContatoUpdate
) => {
  const contatoRepository = AppDataSource.getRepository(Contatos);

  const contatoExist = await contatoRepository.findOne({
    where: { id },
  });

  if (!contatoExist) {
    throw new AppError(400, "Usuario ja deletado");
  }

  await contatoRepository
    .createQueryBuilder()
    .update(Contatos)
    .set({
      nome_completo: nome_completo
        ? nome_completo
        : contatoExist?.nome_completo,
      email: email ? email : contatoExist?.email,
      telefone: telefone ? telefone : contatoExist?.telefone,
      apelido: apelido ? apelido : contatoExist?.apelido,
    })
    .where("id = :id", { id })
    .execute();

  const findContatoResp = await contatoRepository.findOne({
    where: { id },
  });

  return findContatoResp;
};

export default contatoUpdateService;
