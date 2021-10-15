const digitalbazaarVerifiableCredential = require("../digitalbazaar-vc.json");
const transmuteVerifiableCredential = require("../transmute-vc.json");
describe("transmute and digital bazaar verifiable credentials", () => {
  it("should be the same", () => {
    // console.log(digitalbazaarVerifiableCredential);
    // console.log(transmuteVerifiableCredential);
    expect(digitalbazaarVerifiableCredential).toEqual(transmuteVerifiableCredential);
  });
});
