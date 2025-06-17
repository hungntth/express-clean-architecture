const User = require("../../core/entities/user.entity");

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const user = new User(
      null,
      userData.name,
      userData.email,
      userData.password
    );

    user.validate();

    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    return await this.userRepository.create(user);
  }
}

module.exports = CreateUserUseCase;
