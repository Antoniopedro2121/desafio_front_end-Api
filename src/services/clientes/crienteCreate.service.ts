import { AppDataSource } from "../../data-source";
import { AppError } from "../../../errors/appError";
import { ICriateCadastro } from "../../interfaces/cliente.interface";
import { Cliente } from "../../entities/cliente.entity";

const criateCreateService = async ({
  nome_completo,
  email,
  telefone,
}: ICriateCadastro) => {
  const crianteRepository = AppDataSource.getRepository(Cliente);

  const crianteExist = await crianteRepository.findOne({
    where: { email: email },
  });

  if (crianteExist) {
    throw new AppError(400, "E-mail ja cadastrado");
  }

  const newCriante = new Cliente();

  newCriante.nome_completo = nome_completo;
  newCriante.email = email;
  newCriante.telefone = telefone;

  crianteRepository.create(newCriante);
  await crianteRepository.save(newCriante);

  return newCriante;
};

export default criateCreateService;
