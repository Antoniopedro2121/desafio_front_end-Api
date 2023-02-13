import { Request, Response, NextFunction } from "express";

import * as yup from "yup";
import { Schema } from "yup";
import { ICriateCadastro } from "../interfaces/cliente.interface";

export const crianteCreateSchema: Schema<ICriateCadastro> = yup.object().shape({
  nome_completo: yup.string().required(),
  email: yup.string().email().required(),
  telefone: yup.number().required(),
});

export const validateCrianteCreate =
  (schema: Schema<ICriateCadastro>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.crianteCadastroValidator = validatedData;

        next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
