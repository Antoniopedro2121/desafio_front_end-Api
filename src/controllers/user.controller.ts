import { Request, Response } from "express";
import { string } from "yup";
import { AppError, handleError } from "../../errors/appError";
import { ICreateUser } from "../interfaces/user.interfaces";
import userAllService from "../services/user/userAll.service";
import userCreateService from "../services/user/userCreate.service";
import userDeleteService from "../services/user/userDelete.service";
import userOneService from "../services/user/userOne.service";
import userUpdateService from "../services/user/userUpdate.service";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const resp = await userCreateService(data);

    return res.status(201).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const userAllController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const resp = await userAllService();

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const userOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.ITokenInfo;

    const resp = await userOneService(id);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.ITokenInfo;
    const data = req.body;

    const resp = await userUpdateService(id, data);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.ITokenInfo;

    const resp = await userDeleteService(id);

    return res.status(204).json();
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export {
  userCreateController,
  userAllController,
  userOneController,
  userUpdateController,
  deleteUserController,
};
