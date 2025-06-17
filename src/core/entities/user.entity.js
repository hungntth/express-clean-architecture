const { BadRequestError } = require("../../shared/core/error.response");

class UserEntity {
  constructor(id = undefined, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  validate() {
    console.log("Validating user:", this);
    if (!this.email || !this.password) {
      throw new BadRequestError("Invalid user data");
    }
  }
}

module.exports = UserEntity;
