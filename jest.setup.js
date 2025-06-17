// jest.setup.js
const { sequelize } = require("./src/infrastructure/database/sequelize");

let transaction;

// Xử lý các thông báo console không cần thiết
jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "warn").mockImplementation(() => {});

beforeAll(async () => {
  await sequelize.authenticate();
  console.log("✅ Connected to test DB");
});

beforeEach(async () => {
  transaction = await sequelize.transaction();
});

afterEach(async () => {
  if (transaction) {
    await transaction.rollback();
    console.log("↩️ Rolled back transaction");
  }
});

afterAll(async () => {
  await sequelize.close();
  console.log("🔌 Closed DB connection");
});

// Export transaction nếu cần
global.__TEST_TRANSACTION__ = () => transaction;
