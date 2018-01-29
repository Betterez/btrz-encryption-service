module.exports = (algorithm, key) => {
  const EncryptionService = require("./src/encryption-service");

  return new EncryptionService(algorithm, key);
};