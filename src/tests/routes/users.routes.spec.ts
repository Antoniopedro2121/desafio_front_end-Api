import request from "supertest";
import app from "../../app";

import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { createUser } from "../mocks/user/user.mocks";

describe("Usuario rotas testes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /user deve criar um usuario", async () => {
    const response = await request(app).post("/user").send(createUser);

    expect(response.status).toBe(201);
  });

  test("POST /user Não deve conseguir criar um usuario deve dispara um erro 400", async () => {
    const response = await request(app).post("/user").send(createUser);

    expect(response.status).toBe(400);
  });

  test("GET /user não deve ser capas de pegar todos os usuarios erro de autetificação", async () => {
    const response = await request(app).get("/user/all");

    expect(response.status).toBe(401);
  });

  test("GET /user deve ser capas de pegar todos os usuarios", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(createUser);

    const response = await request(app)
      .get("/user/all")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("PATH /user deve ser capas de atualizar o usuarios", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(createUser);

    const response = await request(app)
      .patch("/user/update")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(createUser);

    expect(response.status).toBe(200);
  });

  test("PATH /user não deve ser capas de atualizar o usuarios", async () => {
    const response = await request(app).patch("/user/update").send(createUser);

    expect(response.status).toBe(401);
  });

  test("DEL /user deve ser capas de deletar o usuarios", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(createUser);

    const response = await request(app)
      .delete("/user")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DEL /user não deve ser capas de deletar o usuarios", async () => {
    const response = await request(app).delete("/user").send(createUser);

    expect(response.status).toBe(401);
  });
});
