const CreateUserDto = require("../../application/dto/createUser.dto");
const { SuccessResponse } = require("../../shared/core/success.response");

class UserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;
    const userDto = new CreateUserDto(name, email, password);

    const user = await this.createUserUseCase.execute(userDto);

    new SuccessResponse({
      message: "User created successfully",
      metadata: user,
    }).send(res);
  }
}

module.exports = UserController;
