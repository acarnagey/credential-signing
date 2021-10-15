// import vc from "@digitalbazaar/vc";

// Required to set up a suite instance with private key
const Ed25519VerificationKey2018 = require("@digitalbazaar/ed25519-verification-key-2018");
// const { Ed25519Signature2018 } = require("@digitalbazaar/ed25519-signature-2018");

const rawKeyJson = require("./__fixtures__/keys/key.json");

describe("digital bazaar ed25519", () => {
  it("import key", async () => {

    // const keyPair = new Ed25519VerificationKey2018(rawKeyJson);
    // console.log(keyPair);
    // const suite = new Ed25519Signature2018({ key: keyPair });
    expect(1).toBe(1);
  });
  it.todo("define suite");
  it.todo("issue credential from suite");
  it.todo("verify credential with suite");
  it.todo("write fixtures to disk");
});
