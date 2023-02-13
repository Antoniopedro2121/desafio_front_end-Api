import jsonWeb from "jsonwebtoken";
import "dotenv/config";

import { Request, Response, NextFunction } from "express";

const autentificarToken = (
  resp: Request,
  req: Response,
  next: NextFunction
) => {
  let token = resp.headers.authorization;

  if (!token) {
    return req.status(401).json({
      message: "Missing authorization headers",
    });
  }

  token = token.split(" ")[1];

  jsonWeb.verify(
    token,
    process.env.SECRET_KEY as string,
    (error, decoded: any) => {
      if (error) {
        return req
          .status(401)
          .json({ message: "Missing authorization headers" });
      } else {
        resp.ITokenInfo = {
          id: decoded.id,
        };

        next();
      }
    }
  );
};

export default autentificarToken;
