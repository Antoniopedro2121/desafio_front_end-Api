import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import contatoAllService from "../services/contatos/contatoAll.service";
import contatosByClienteService from "../services/contatos/contatoByCliente.service";
import contatosByIdService from "../services/contatos/contatoById.service";
import contatoCreateService from "../services/contatos/contatoCreate.service";
import contatoDeleteService from "../services/contatos/contatoDelete.service";
import contatoUpdateService from "../services/contatos/contatoUpdate.service";

//contato

const contatoCreateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const resp = await contatoCreateService(data, id);

    return res.status(201).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const contatoAllController = async (req: Request, res: Response) => {
  try {
    const resp = await contatoAllService();

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const contatoByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resp = await contatosByIdService(id);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const contatoUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const resp = await contatoUpdateService(id, data);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const contatoDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resp = await contatoDeleteService(id);

    return res.status(204).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

const contatoByClienteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resp = await contatosByClienteService(id);

    return res.status(200).json(resp);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export {
  contatoCreateController,
  contatoAllController,
  contatoByIdController,
  contatoUpdateController,
  contatoDeleteController,
  contatoByClienteController,
};
