import { Request, Response, NextFunction } from "express";

import * as yup from "yup";
import { Schema } from "yup";
import { ICreateUser } from "../interfaces/user.interfaces";

export const userCreateSchema: Schema<ICreateUser> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const validateUserCreate =
  (schema: Schema<ICreateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.userCreateValidate = validatedData;

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
