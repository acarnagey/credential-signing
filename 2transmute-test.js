const fs = require("fs");
const {
  Ed25519Signature2018,
  Ed25519VerificationKey2018,
} = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");
const credential2 = require('./test/__fixtures__/credentials/credential2.json')


const documentLoader = require("./test/__fixtures__/documentLoader");
const rawKeyJson = require("./test/__fixtures__/keys/key.json");
const credential = credential2;

(async () => {
  const key = await Ed25519VerificationKey2018.from(rawKeyJson);
  const suite = new Ed25519Signature2018({
    key,
    date: credential.issuanceDate,
  });
  const result = await vcjs.verifiable.credential.create({
    credential,
    suite,
    documentLoader,
  });
  // Verification is broken in transmute libraries
  const result2 = await vcjs.verifiable.credential.verify({
    credential: result.items[0],
    format: ["vc"],
    documentLoader,
    suite: [new Ed25519Signature2018()],
  });
  console.log(result2);
  if(result2.verified) {
    // fs.writeFileSync(
    //   "./transmute-vc.json",
    //   JSON.stringify(result.items[0], null, 2)
    // );
  }
})();
