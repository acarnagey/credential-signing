const fs = require("fs");

const {
  Ed25519VerificationKey2018,
} = require("@digitalbazaar/ed25519-verification-key-2018");
const {
  Ed25519Signature2018,
} = require("@digitalbazaar/ed25519-signature-2018");
const vc = require("@digitalbazaar/vc");
const vc2 = require("./test/__fixtures__/vcs/mavennet-vc.json");

const documentLoader = require("./test/__fixtures__/documentLoader");

(async () => {
  const result = await vc.verifyCredential({
    credential: vc2,
    suite: new Ed25519Signature2018(),
    documentLoader,
  });
  console.log(JSON.stringify(result, null, 2));
})();
