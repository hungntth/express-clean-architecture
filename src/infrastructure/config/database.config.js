module.exports = {
  dialect: "postgres", // Hoặc 'mysql', 'sqlite', 'mssql'
  url:
    process.env.DEV_DB_URL ||
    "postgres://postgres:95a3FqXFsUDhxRd@localhost:5432/postgres",
  host: process.env.DEV_DB_HOST || "localhost",
  port: parseInt(process.env.DEV_DB_PORT || "5432", 10),
  username: process.env.DEV_DB_USER || "postgres",
  password: process.env.DEV_DB_PASS || "95a3FqXFsUDhxRd",
  database: process.env.DEV_DB_NAME || "postgres",
  logging: console.log, // Hiển thị log SQL trong development
  sync: { enable: true, force: false, alter: true }, // Cẩn thận với force: true (xóa data)
  pool: {
    max: 50, // Số connection tối đa
    min: 0, // Số connection tối thiểu
    acquire: 30000, // Thời gian chờ kết nối (ms)
    idle: 10000, // Thời gian connection không hoạt động
  },
  dialectOptions: {
    ssl:
      process.env.DB_SSL === "true"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  },
};
