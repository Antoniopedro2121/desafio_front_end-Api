import { AppError } from "../../../errors/appError";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userOneService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const userExist = await userRepository.findOne({
    where: { id },
  });

  if (!userExist) {
    throw new AppError(400, "Usuario ja deletado");
  }

  const users = userRepository.findOne({ where: { id } });

  return users;
};

export default userOneService;
