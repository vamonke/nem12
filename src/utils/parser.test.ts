import { Nem12Parser } from "./Parser";
import { nem12CsvString, nem12File } from "./examples";

describe("Nem12Parser", () => {
  // it("should parse a CSV string", () => {
  //   const result = Nem12Parser.parse(nem12CsvString);
  //   expect(result).toEqual(nem12File);
  // });

  it("should parse a header record", () => {
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

  it("should parse data details record", () => {
    const dataDetails = Nem12Parser.parseDataDetails(
      "200,NEM1201009,E1E2,1,E1,N1,01009,kWh,30,20050610"
    );
    expect(dataDetails).toEqual({
      recordIndicator: 200,
      nmi: "NEM1201009",
      nmiConfiguration: "E1E2",
      registerId: "1",
      nmiSuffix: "E1",
      mdmDataStreamIdenfier: "N1",
      meterSerialNumber: "01009",
      uom: "kWh",
      intervalLength: 30,
      nextScheduledReadDate: new Date("2005-06-10T00:00"),
      intervalData: [],
    });
  });

  it("should parse an interval 30 data record", () => {
    const intervalData = Nem12Parser.parse30IntervalData(
      "300,20050301,0,0,0,0,0,0,0,0,0,0,0,0,0.461,0.81,0.568,1.234,1.353,1.507,1.344,1.773"
    );
    expect(intervalData).toEqual({
      recordIndicator: 300,
      intervalDate: new Date("2005-03-01T00:00"),
      intervalValues: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.461, 0.81, 0.568, 1.234, 1.353,
        1.507, 1.344, 1.773,
      ],
      intervalEvents: [],
      b2bDetails: [],
    });
  });

  it("should parse a footer record", () => {
    const footer = Nem12Parser.parseFooter("900");
    expect(footer).toEqual({
      recordIndicator: 900,
    });
  });
});
