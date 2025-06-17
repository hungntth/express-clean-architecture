const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");
const CreateUserUseCase = require("../../../application/usecases/createUser.usecase");
const UserRepository = require("../../../infrastructure/repositories/user.repository");
const asyncHandler = require("../../../shared/helpers/asyncHandler");

// Dependency injection
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

router.post(
  "/",
  asyncHandler(userController.createUser.bind(userController))
);

module.exports = router;
