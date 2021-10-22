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
const rawKeyJson = require("./test/__fixtures__/keys/key.json");
const credential = vc2;
delete credential.proof;
credential.issuer = rawKeyJson.controller;

(async () => {
  const keyPair = new Ed25519VerificationKey2018(rawKeyJson);
  const suite = new Ed25519Signature2018({
    key: keyPair,
    date: credential.issuanceDate,
  });

  const signedVC = await vc.issue({ credential, suite, documentLoader });
  // console.log(JSON.stringify(signedVC, null, 2));
  const result = await vc.verifyCredential({
    credential: signedVC,
    suite,
    documentLoader,
  });
  if (result.verified) {
    fs.writeFileSync(
      "./digitalbazaar-vc.json",
      JSON.stringify(signedVC, null, 2)
    );
  }

  
  // const suite2 = new Ed25519Signature2018({
  //   key: keyPair,
  //   date: vc2.issuanceDate,
  // });
  // const result2 = await vc.verifyCredential({
  //   credential: vc2,
  //   suite: suite2,
  //   documentLoader,
  // });
  console.log(JSON.stringify(result, null, 2));
})();
