import request from "supertest";
import app from "../../app";

import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { createUser } from "../mocks/user/user.mocks";
import {
  criateCadastro,
  criateCadastro2,
  criateCadastro3,
} from "../mocks/cliente/cliente.mocks";

describe("Cliente rotas", () => {
  let connection: DataSource;

  let user: any;
  let userLoginResponse: any;
  let cliente: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });

    user = await request(app).post("/user").send(createUser);
    userLoginResponse = await request(app).post("/login").send(createUser);
    cliente = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(criateCadastro);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /client deve criar um cliente", async () => {
    const response = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(criateCadastro2);

    expect(response.status).toBe(201);
  });

  test("POST /client Não deve conseguir criar um cliente deve dispara um erro 401", async () => {
    const response = await request(app).post("/client").send(criateCadastro2);

    expect(response.status).toBe(401);
  });

  test("GET /client/all não deve ser capas de pegar todos os contato erro de autetificação", async () => {
    const response = await request(app).get("/client/all");

    expect(response.status).toBe(401);
  });

  test("GET /client/all deve ser capas de pegar todos os contato", async () => {
    const response = await request(app)
      .get("/client/all")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("PATH /client/id deve ser capas de atualizar o cliente", async () => {
    const response = await request(app)
      .patch(`/client/${cliente.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(criateCadastro3);

    expect(response.status).toBe(200);
  });

  test("PATH /client/id não deve ser capas de atualizar o cliente", async () => {
    const response = await request(app)
      .patch(`/client/${cliente.body.id}`)
      .send(criateCadastro);

    expect(response.status).toBe(401);
  });

  test("DEL /client deve ser capas de deletar o cliente", async () => {
    const response = await request(app)
      .delete(`/client/${cliente.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DEL /client não deve ser capas de deletar o cliente", async () => {
    const response = await request(app).delete(`/client/${cliente.body.id}`);

    expect(response.status).toBe(401);
  });
});
