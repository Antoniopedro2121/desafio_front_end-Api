import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userAllService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = userRepository.find();

  return (await users).map(({ password: string, ...user }) => user);
};

export default userAllService;
