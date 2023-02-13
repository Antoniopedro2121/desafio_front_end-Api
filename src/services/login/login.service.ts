import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { compare } from "bcrypt";
import { ICreateUser } from "../../interfaces/user.interfaces";
import { AppError } from "../../../errors/appError";

import jwt from "jsonwebtoken";

const loginService = async ({ email, password, name }: ICreateUser) => {
  const userRepository = AppDataSource.getRepository(User);

  if (email == undefined || password == undefined) {
    throw new AppError(400, `faltando informação ${email} ${password} 1`);
  }

  const userExist = await userRepository.findOne({
    where: { email: email },
  });

  if (!userExist) {
    throw new AppError(400, "Login invalido");
  }

  const passwordMatch = await compare(password, userExist.password);

  if (!passwordMatch) {
    throw new Error("Invalid user or password");
  }

  const token = jwt.sign(
    {
      id: userExist.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: userExist.id,
    }
  );

  return { token: token };
};

export default loginService;
