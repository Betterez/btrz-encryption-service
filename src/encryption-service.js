"use strict";
const crypto = require("crypto");

class EncryptionService {
  constructor(algorithm, password) {
    this.algorithm = algorithm;
    this.password = password;
  }

  evpBytesToKey(password, keyLen, ivLen) {
    let data = Buffer.alloc(0),
      key = Buffer.alloc(0);

    while (key.length < keyLen + ivLen) {
      const hash = crypto.createHash("md5");
      hash.update(data);
      hash.update(password);
      data = hash.digest();
      key = Buffer.concat([key, data]);
    }

    return {
      key: key.subarray(0, keyLen),
      iv: key.subarray(keyLen, keyLen + ivLen),
    };
  }

  encryptIv(text) {
    const infoCipher = crypto.getCipherInfo(this.algorithm),
      {key, iv} = this.evpBytesToKey(
        Buffer.from(this.password, "utf8"),
        infoCipher.keyLength,
        infoCipher.ivLength
      ),
      cipher = crypto.createCipheriv(this.algorithm, key, iv);
    let crypted = cipher.update(text, "utf8", "hex");

    crypted += cipher.final("hex");

    return crypted;
  }

  decryptIv(text) {
    const infoCipher = crypto.getCipherInfo(this.algorithm),
      {key, iv} = this.evpBytesToKey(
        Buffer.from(this.password, "utf8"),
        infoCipher.keyLength,
        infoCipher.ivLength
      ),
      decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    let dec = decipher.update(text, "hex", "utf8");

    dec += decipher.final("utf8");
    return dec;
  }
  // Deprecated
  encrypt(text) {
    const cipher = crypto.createCipher(this.algorithm, this.password);
    let crypted = cipher.update(text, "utf8", "hex");

    crypted += cipher.final("hex");
    return crypted;    
  }
  // Deprecated
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
    return this.applyOnProperties(object, this.decryptIv);
  }

  getEncryptedObjectTextProps(object) {
    return this.applyOnProperties(object, this.encryptIv);
  }
}

module.exports = EncryptionService;
