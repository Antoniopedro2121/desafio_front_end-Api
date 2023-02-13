import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import criateUpdateService from "../services/clientes/criante.update.service";
import criateByIdService from "../services/clientes/crianteById.service";
import criateDeleteService from "../services/clientes/crianteDelete.service";
import criateAllService from "../services/clientes/crienteAll.service";
import criateCreateService from "../services/clientes/crienteCreate.service";

const crianteCreateController = async (req: Request, res: Response) => {
  try {
    const data = req.crianteCadastroValidator;

    const resp = await criateCreateService(data);

    return res.status(201).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const crianteAllController = async (req: Request, res: Response) => {
  try {
    const resp = await criateAllService();

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const criateByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resp = await criateByIdService(id);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const criateUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const resp = await criateUpdateService(id, data);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const criateDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const resp = await criateDeleteService(id);

    return res.status(204).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export {
  crianteCreateController,
  crianteAllController,
  criateByIdController,
  criateUpdateController,
  criateDeleteController,
};
