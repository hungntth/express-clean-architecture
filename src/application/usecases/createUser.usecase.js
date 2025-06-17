const UserEntity = require("../../core/entities/user.entity");
const { BadRequestError } = require("../../shared/core/error.response");

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const user = new UserEntity(
      undefined,
      userData.name,
      userData.email,
      userData.password
    );

    user.validate();

    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    return await this.userRepository.create(user);
  }
}

module.exports = CreateUserUseCase;
