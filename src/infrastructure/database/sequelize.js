"use strict";

const { Sequelize } = require("sequelize");
const config = require("../config");

class Database {
  constructor() {
    this.sequelize = this.createConnection();
    this.setupEventListeners();
  }

  createConnection() {
    return new Sequelize(config.database.url, {
      dialect: config.database.dialect,
      logging: config.database.logging,
      pool: config.database.pool,
      dialectOptions: config.database.dialectOptions,
      benchmark: true,
    });
  }

  setupEventListeners() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("PostgreSQL connected successfully");
      })
      .catch((err) => {
        console.error("[DB CONNECTION ERROR]:", err);
        process.exit(1);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Thêm method để lấy sequelize instance
  getSequelize() {
    return this.sequelize;
  }
}

// Thay đổi cách export
const databaseInstance = Database.getInstance();
module.exports = {
  databaseInstance,
  sequelize: databaseInstance.getSequelize(), // Export trực tiếp sequelize instance
};
