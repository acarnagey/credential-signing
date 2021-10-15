const fs = require("fs");

const {
  Ed25519VerificationKey2018,
} = require("@digitalbazaar/ed25519-verification-key-2018");
const {
  Ed25519Signature2018,
} = require("@digitalbazaar/ed25519-signature-2018");
const vc = require("@digitalbazaar/vc");

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
  const keyPair = new Ed25519VerificationKey2018(rawKeyJson);
  const suite = new Ed25519Signature2018({
    key: keyPair,
    date: credential.issuanceDate,
  });

  const signedVC = await vc.issue({ credential, suite });
  const result = await vc.verifyCredential({
    credential: signedVC,
    suite,
    documentLoader,
  });
  // console.log(JSON.stringify(result, null, 2));

  if (result.verified) {
    fs.writeFileSync(
      "./digitalbazaar-vc.json",
      JSON.stringify(signedVC, null, 2)
    );
  }
})();
