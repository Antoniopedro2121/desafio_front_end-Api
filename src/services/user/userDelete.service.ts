import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  await userRepository
    .createQueryBuilder("users")
    .delete()
    .from(User)
    .where("id = :id", { id })
    .execute();
};

export default userDeleteService;
