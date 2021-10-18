const digitalbazaarVerifiableCredential = require("../digitalbazaar-vc.json");
const transmuteVerifiableCredential = require("../transmute-vc.json");
const transmuteProof = require("../transmute-proof-fixture.json");
const digitalbazaarProof = require("../digitalbazaar-proof-fixture.json");
describe("transmute and digital bazaar verifiable credentials", () => {
  it("should be the same", () => {
    expect(digitalbazaarVerifiableCredential).toEqual(transmuteVerifiableCredential);
  });

  it("should have same proof with suite libraries", () => {
    expect(digitalbazaarProof).toEqual(transmuteProof);
  });
});
