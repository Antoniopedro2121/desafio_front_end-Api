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
import {
  contatoCadastro,
  contatoCadastro2,
  contatoCadastro3,
} from "../mocks/contato/contato.mocks";

describe("contatos rotas", () => {
  let connection: DataSource;

  let user: any;
  let userLoginResponse: any;
  let cliente: any;
  let contato: any;

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
    contato = await request(app)
      .post(`/contato/${cliente.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(contatoCadastro2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contato deve criar um contato", async () => {
    const response = await request(app)
      .post(`/contato/${cliente.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(contatoCadastro);

    expect(response.status).toBe(201);
  });

  test("POST /contato Não deve conseguir criar um contato deve dispara um erro", async () => {
    const response = await request(app)
      .post(`/contato/${cliente.body.id}`)
      .send(contatoCadastro);

    expect(response.status).toBe(401);
  });

  test("GET /contato/all não deve ser capas de pegar todos os usuarios erro de autetificação", async () => {
    const response = await request(app).get("/contato/all");

    expect(response.status).toBe(401);
  });

  test("GET /contato/all deve ser capas de pegar todos os contato", async () => {
    const response = await request(app)
      .get("/contato/all")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("GET /contato/all deve ser capas de pegar todos os contato de um cliente", async () => {
    const response = await request(app)
      .get(`/contato/cliente/${cliente.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("PATH /contato/id deve ser capas de atualizar o contato", async () => {
    const response = await request(app)
      .patch(`/contato/${contato.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(contatoCadastro3);

    expect(response.status).toBe(200);
  });

  test("PATH /contato/id não deve ser capas de atualizar o contato", async () => {
    const response = await request(app)
      .patch(`/contato/${contato.body.id}`)
      .send(contatoCadastro3);

    expect(response.status).toBe(401);
  });

  test("DEL /contato deve ser capas de deletar o contato", async () => {
    const response = await request(app)
      .delete(`/contato/${contato.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DEL /contato não deve ser capas de deletar o contato", async () => {
    const response = await request(app)
      .delete(`/contato/${contato.body.id}`)
      .send(createUser);

    expect(response.status).toBe(401);
  });
});
