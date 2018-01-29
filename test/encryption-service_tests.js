"use strict";

const expect = require("chai").expect,
  service = require("../index")("AES256", "secretKey");

describe("Encryption Service", () => {
  describe("#encrypt()", () => {
    it("should encrypt the text", () => {
      const text = "my password",
        result = service.encrypt(text);

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
});
