const fs = require("fs");
const {
  Ed25519Signature2018,
  Ed25519VerificationKey2018,
} = require("@transmute/ed25519-signature-2018");
const vcjs = require("@transmute/vc.js");

const documentLoader = require("./test/__fixtures__/documentLoader");
const rawKeyJson = require("./test/__fixtures__/keys/key.json");
const credential = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  id: "https://example.com/credentials/1872",
  type: ["VerifiableCredential"],
  issuer: rawKeyJson.controller,
  issuanceDate: "2010-01-01T19:23:24Z",
  credentialSubject: {
    id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
  },
};

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
  // const result2 = await vcjs.verifiable.credential.verify({
  //   credential: result.items[0],
  //   format: ["vc"],
  //   documentLoader,
  //   suite: [new Ed25519Signature2018()],
  // });
  // console.log(JSON.stringify(result2, null, 2));
  fs.writeFileSync(
    "./transmute-vc.json",
    JSON.stringify(result.items[0], null, 2)
  );
})();
