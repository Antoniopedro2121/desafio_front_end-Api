import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUpdateUser } from "../../interfaces/user.interfaces";

import { hash } from "bcrypt";
import { AppError } from "../../../errors/appError";

const userUpdateService = async (
  id: string,
  { email, name, password }: IUpdateUser
) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.findOne({ where: { id } });

  if (!users) {
    throw new AppError(400, "Usuario ja deletado");
  }

  let hashedPassword: string;
  if (password) {
    hashedPassword = await hash(password, 10);
  }

  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({
      name: name ? name : users?.name,
      email: email ? email : users?.email,
      password: password ? hashedPassword! : users?.password,
    })
    .where("id = :id", { id })
    .execute();

  const findUserResp = await userRepository.findOne({
    where: { id },
  });

  return findUserResp;
};

export default userUpdateService;
