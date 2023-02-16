import express from "express";
import cors from "cors";

import routes from "./routes";
import GlobalErrorMiddleware from "./Middlewares/GlobalError.middleware";

import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(routes);
// app.use(GlobalErrorMiddleware);

app.use("/teste", (resp, res) => {
  return res.status(201).json({ ok: "tudo ok" });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
// app.listen(3001);
