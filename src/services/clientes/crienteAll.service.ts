import { AppDataSource } from "../../data-source";
import { Cliente } from "../../entities/cliente.entity";

const criateAllService = async () => {
  const crianteRepository = AppDataSource.getRepository(Cliente);

  const criante = crianteRepository.find();

  return criante;
};

export default criateAllService;
