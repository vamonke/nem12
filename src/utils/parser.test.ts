import { Nem12Parser } from "./Parser";
import { nem12CsvString, nem12File } from "./examples";

describe("Nem12Parser", () => {
  // it("should parse a CSV string", () => {
  //   const result = Nem12Parser.parse(nem12CsvString);
  //   expect(result).toEqual(nem12File);
  // });

  it("should parse the header", () => {
    const header = Nem12Parser.parseHeader(
      "100,NEM12,200506081149,UNITEDDP,NEMMCO"
    );
    expect(header).toEqual({
      recordIndicator: 100,
      versionHeader: "NEM12",
      dateTime: new Date("2005-06-08T11:49"),
      fromParticipant: "UNITEDDP",
      toParticipant: "NEMMCO",
    });
  });

  it("should parse the body", () => {
    
  });

  it("should parse the footer", () => {
    const footer = Nem12Parser.parseFooter("900");
    expect(footer).toEqual({
      recordIndicator: 900
    });
  });
});
