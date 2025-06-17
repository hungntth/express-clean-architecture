const { BadRequestError } = require("../../shared/core/error.response");

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  validate() {
    if (!this.email || !this.password) {
      throw new BadRequestError("Invalid user data");
    }
  }
}

module.exports = User;
