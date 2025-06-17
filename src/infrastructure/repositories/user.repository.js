const UserRepositoryInterface = require("../../core/interfaces/user.repository.interface");
const UserModel = require("../database/models/user.model");

class UserRepository extends UserRepositoryInterface {
  async create(user) {
    return await UserModel.create(user);
  }

  async findById(id) {
    return await UserModel.findByPk(id);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  }

  async update(id, userData) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    return await user.update(userData);
  }

  async delete(id) {
    const user = await UserModel.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
}

module.exports = UserRepository;
