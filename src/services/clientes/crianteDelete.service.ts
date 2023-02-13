import { AppDataSource } from "../../data-source";
import { Cliente } from "../../entities/cliente.entity";

const criateDeleteService = async (id: string) => {
  const criateRepository = AppDataSource.getRepository(Cliente);

  await criateRepository
    .createQueryBuilder("clientes")
    .delete()
    .from(Cliente)
    .where("id = :id", { id })
    .execute();
};

export default criateDeleteService;
