module.exports = async (callback) => {
  const transaction = global.__TEST_TRANSACTION__();
  return await callback(transaction);
};
