# btrz-encryption-service

Library that encrypts or decrypts text using node crypto.

## How to include it to a project

```bash
npm install --save btrz-encryption-service
```

Requires 2 parameters: 

* Algorithm: The algorithm is dependent on OpenSSL, examples are 'aes192', etc. On recent OpenSSL releases, openssl list-cipher-algorithms will display the available cipher algorithms.
* Password: The password is used to derive the cipher key and initialization vector (IV). The value must be either a 'latin1' encoded string, a Buffer, a TypedArray, or a DataView.

```node
const encriptionService = require("btrz-encryption-service")(algorithm, password);
```

## Methods

### encrypt(string)

Encrypts the passed string and returns it.

### decrypt(encrypted)

Decrypts the passed value and returns the string.

### getEncryptedObjectTextProps(object)

Applies the encrypt function to each string property in the passed object. 
The object must only have properties of type string.
Returns a new object with the encrypted properties.

### getDecryptedObjectTextProps(object)

Applies the decrypt function to each encrypted property in the passed object. 
The object must only have encrypted properties.
Returns a new object with the decrypted properties.
