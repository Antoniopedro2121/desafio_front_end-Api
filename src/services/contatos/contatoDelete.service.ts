import { AppDataSource } from "../../data-source";
import { Contatos } from "../../entities/contatos.entity";

const contatoDeleteService = async (id: string) => {
  const contatoRepository = AppDataSource.getRepository(Contatos);

  await contatoRepository
    .createQueryBuilder("contatos")
    .delete()
    .from(Contatos)
    .where("id = :id", { id })
    .execute();
};

export default contatoDeleteService;
