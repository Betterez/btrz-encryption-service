"use strict";

const expect = require("chai").expect,
  service = require("../index")("AES256", "secretKey");

describe("Encryption Service", () => {
  describe("#encryptIv()", () => {
    it("should encrypt the text", () => {
      const text = "my password",
        result = service.encryptIv(text);

      expect(result).to.be.eql("b6441f655c01bed788ccc56be7a21fda");
    });
  });

  describe("#getEncryptedObjectTextProps()", () => {
    it("should return the same object with the encrypted props", () => {
      const object = {
          prop1: "prop1",
          prop2: "prop2"
        },
        result = service.getEncryptedObjectTextProps(object);

      expect(result.prop1).to.be.eql("268113052ab0dd5bd2b0227a8915d83c");
      expect(result.prop2).to.be.eql("f12af480a2c377a0a385008e8c9a6a66");
    });
  }); 
  
  describe("#decryptIv()", () => {
    it("should decrypt the text", () => {
      const text = "b6441f655c01bed788ccc56be7a21fda",
        result = service.decryptIv(text);

      expect(result).to.be.eql("my password");
    });
  });

  describe("#getDecryptedObjectTextProps()", () => {
    it("should return the same object with the decrypted props", () => {
      const object = {
          prop1: "268113052ab0dd5bd2b0227a8915d83c",
          prop2: "f12af480a2c377a0a385008e8c9a6a66"
        },
        result = service.getDecryptedObjectTextProps(object);

      expect(result.prop1).to.be.eql("prop1");
      expect(result.prop2).to.be.eql("prop2");
    });
  });    
});
