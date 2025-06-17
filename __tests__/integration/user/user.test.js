const request = require("supertest");
const { sequelize } = require("../../../src/infrastructure/database/sequelize");
const UserModel = require("../../../src/infrastructure/database/models/user.model");
const UserRepository = require("../../../src/infrastructure/repositories/user.repository");
const CreateUserUseCase = require("../../../src/application/usecases/createUser.usecase");
const UserController = require("../../../src/interfaces/controllers/user.controller");

describe("Integration: POST /users with rollback", () => {
  let transaction;

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  beforeEach(async () => {
    transaction = await sequelize.transaction();
  });

  afterEach(async () => {
    await transaction.rollback();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should insert user and rollback after test", async () => {
    // 👇 Tạo repository tạm với transaction inject
    const realRepo = new UserRepository();
    jest.spyOn(realRepo, "create").mockImplementation(async (user) => {
      return await UserModel.create(user, { transaction });
    });

    const useCase = new CreateUserUseCase(realRepo);
    const controller = new UserController(useCase);

    // 👇 Tạo router tạm dùng controller custom
    const express = require("express");
    const tempApp = express();
    tempApp.use(express.json());
    tempApp.post("/users", controller.createUser.bind(controller));

    const res = await request(tempApp).post("/users").send({
      name: "Rollback User",
      email: "rollback@example.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
    const metadata = res.body.metadata;
    expect(metadata.email).toBe("rollback@example.com");

    // 👇 Kiểm tra user tồn tại trong transaction
    const found = await UserModel.findOne({
      where: { email: "rollback@example.com" },
      transaction,
    });
    expect(found).not.toBeNull();
  });

  it("should rollback user after test", async () => {
    const check = await UserModel.findOne({
      where: { email: "rollback@example.com" },
    });
    expect(check).toBeNull(); // ✅ Rollback đã xoá user
  });
});
