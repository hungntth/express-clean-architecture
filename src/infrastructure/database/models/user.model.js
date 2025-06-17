const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const {
  BadRequestError,
  AuthFailureError,
} = require("../../../shared/core/error.response");

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 128], // Password từ 8-128 ký tự
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    paranoid: true, // Soft delete
    hooks: {
      beforeCreate: async (user) => {
        if (user.email) {
          const existingUser = await UserModel.findOne({
            where: { email: user.email },
          });
          if (existingUser) {
            throw new BadRequestError("Email already in use");
          }
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("email")) {
          const existingUser = await UserModel.findOne({
            where: { email: user.email },
          });
          if (existingUser && existingUser.id !== user.id) {
            throw new BadRequestError("Email already in use");
          }
        }
      },
    },
  }
);

// Instance methods
UserModel.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password; // Loại bỏ password khi trả về JSON
  delete values.deletedAt; // Loại bỏ deletedAt trong soft delete
  return values;
};

// Static methods
UserModel.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    throw new AuthFailureError("Invalid login credentials");
  }
  // Giả sử đã có hàm comparePassword (sẽ triển khai ở bước 2)
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AuthFailureError("Invalid login credentials");
  }
  return user;
};

module.exports = UserModel;
