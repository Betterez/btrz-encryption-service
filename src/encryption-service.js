"use strict";
const crypto = require("crypto");

class EncryptionService {

  constructor (algorithm, key) {
    this.algorithm = algorithm;
    this.key = key;
  }

  encrypt(text) {
    const cipher = crypto.createCipher(this.algorithm, this.key);
    let crypted = cipher.update(text, "utf8", "hex");

    crypted += cipher.final("hex");
    return crypted;    
  }

  getEncryptedObjectTextProps(object) {
    const keys = Object.keys(object);
    let result = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result[key] = this.encrypt(object[key]);      
    }
    
    return result;
  }
}

module.exports = EncryptionService;