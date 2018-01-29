"use strict";
const crypto = require("crypto");

class EncryptionService {
  constructor(algorithm, password) {
    this.algorithm = algorithm;
    this.password = password;
  }

  encrypt(text) {
    const cipher = crypto.createCipher(this.algorithm, this.password);
    let crypted = cipher.update(text, "utf8", "hex");

    crypted += cipher.final("hex");
    return crypted;    
  }

  decrypt(text) {
    const decipher = crypto.createDecipher(this.algorithm, this.password);
    let dec = decipher.update(text, "hex", "utf8");

    dec += decipher.final("utf8");
    return dec;
  }
  
  applyOnProperties(object, func) {
    const keys = Object.keys(object),
      result = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result[key] = func.bind(this, object[key])();      
    }
    
    return result;
  }

  getDecryptedObjectTextProps(object) {
    return this.applyOnProperties(object, this.decrypt);
  }

  getEncryptedObjectTextProps(object) {
    return this.applyOnProperties(object, this.encrypt);
  }
}

module.exports = EncryptionService;
