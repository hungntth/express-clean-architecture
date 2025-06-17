"use strict";

const os = require("os");
const process = require("process");

class DatabaseMonitor {
  constructor(sequelizeInstance) {
    this.sequelize = sequelizeInstance;
    this._SECONDS = 60000;
  }

  startMonitoring() {
    this.monitorInterval = setInterval(() => {
      this.checkSystemHealth();
    }, this._SECONDS);
  }

  stopMonitoring() {
    clearInterval(this.monitorInterval);
  }

  checkSystemHealth() {
    const pool = this.sequelize.connectionManager.pool;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5;

    console.log("Database Monitoring:::");
    console.log(`Connections: ${pool.size}/${maxConnections}`);
    console.log(`Memory: ${(memoryUsage / 1024 / 1024).toFixed(2)} MB`);
    console.log(`CPU Cores: ${numCores}`);
    console.log(":::::::::::::::::::::::");

    if (pool.size > maxConnections * 0.8) {
      console.warn("[WARNING] Database connection approaching limit!");
    }
  }

  async performHealthCheck() {
    try {
      await this.sequelize.query("SELECT 1");
      return { healthy: true };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
      };
    }
  }
}

module.exports = DatabaseMonitor;
