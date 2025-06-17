class UserRepositoryInterface {
  async create(user) {
    throw new Error("Not implemented");
  }
  async findById(id) {
    throw new Error("Not implemented");
  }
  async findByEmail(email) {
    throw new Error("Not implemented");
  }
  async update(id, userData) {
    throw new Error("Not implemented");
  }
  async delete(id) {
    throw new Error("Not implemented");
  }
}

module.exports = UserRepositoryInterface;
