import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { hashSync } from "bcrypt";
import { ICreateUser } from "../../interfaces/user.interfaces";
import { AppError } from "../../../errors/appError";

const userCreateService = async ({ email, password, name }: ICreateUser) => {
  const userRepository = AppDataSource.getRepository(User);

  const userExist = await userRepository.findOne({
    where: { email: email },
  });

  if (userExist) {
    throw new AppError(400, "E-mail ja cadastrado");
  }

  const newUser = new User();

  newUser.name = name;
  newUser.email = email;
  newUser.password = hashSync(password, 10);

  userRepository.create(newUser);
  await userRepository.save(newUser);

  const { password: string, ...user } = newUser;

  return user;
};

export default userCreateService;
