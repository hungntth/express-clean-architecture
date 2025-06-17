"use strict";

const DatabaseMonitor = require("../../shared/helpers/databaseMonitor");
const { sequelize } = require("./sequelize"); // Import đúng sequelize instance

// Khởi tạo monitor
const dbMonitor = new DatabaseMonitor(sequelize);
dbMonitor.startMonitoring();

// Export để sử dụng trong app
module.exports = {
  sequelize, // Export sequelize instance đã được khởi tạo
  dbMonitor,
};
