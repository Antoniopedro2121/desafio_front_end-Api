import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { ILogin } from "../interfaces/user.interfaces";
import loginService from "../services/login/login.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const resp = await loginService(data);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export { loginController };
