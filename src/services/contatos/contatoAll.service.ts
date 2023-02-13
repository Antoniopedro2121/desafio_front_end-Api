import { AppDataSource } from "../../data-source";
import { Contatos } from "../../entities/contatos.entity";

const contatoAllService = async () => {
  const contatoRepository = AppDataSource.getRepository(Contatos);

  const contato = contatoRepository.find();

  return contato;
};

export default contatoAllService;
