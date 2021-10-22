// const fs = require("fs");
const {
  Ed25519Signature2018,
  Ed25519VerificationKey2018
} = require("@transmute/ed25519-signature-2018");
const credential3 = require('./test/__fixtures__/credentials/credential2.json')

const documentLoader = require("./test/__fixtures__/documentLoader");
const rawKeyJson = require("./test/__fixtures__/keys/key.json");
const credential = credential2;

(async () => {
  const keyPair = await Ed25519VerificationKey2018.from(rawKeyJson);
  const suite = new Ed25519Signature2018({
    key: keyPair,
    date: credential.issuanceDate,
  });
  const proof = await suite.createProof({
    document: credential,
    purpose: {
      // ignore validation of dates and such...
      validate: () => {
        return { valid: true };
      },
      update: (proof) => {
        proof.proofPurpose = "assertionMethod";
        return proof;
      },
    },
    documentLoader,
    // expansionMap,
    compactProof: false,
  });
  const result = await suite.verifyProof({
    proof,
    document: credential,
    purpose: {
      // ignore validation of dates and such...
      validate: () => {
        return { valid: true };
      },
      update: (proof) => {
        proof.proofPurpose = "assertionMethod";
        return proof;
      },
    },
    documentLoader,
    // expansionMap,
    compactProof: false,
  });
  console.log(result);
  if (result.verified) {
    // fs.writeFileSync(
    //   "./transmute-proof-fixture.json",
    //   JSON.stringify(proof, null, 2)
    // );
  }
})();
