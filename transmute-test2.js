const {
  Ed25519Signature2018,
  Ed25519VerificationKey2018,
} = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");
const vc2 = require("./test/__fixtures__/vcs/mavennet-vc.json");

const documentLoader = require("./test/__fixtures__/documentLoader");

(async () => {
  const result = await vcjs.verifiable.credential.verify({
    credential: vc2,
    suite: new Ed25519Signature2018(),
    documentLoader,
  });
  console.log(result);
})();
