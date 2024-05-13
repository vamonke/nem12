import { Nem12Parser } from "./Parser";
import { nem12CsvString, nem12File } from "../sample/examples";


describe("Nem12Parser", () => {
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

  it("should parse a NMI data details record", () => {
    const dataDetails = Nem12Parser.parseNmiDataDetails(
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

  it("should parse a 30-min interval data record", () => {
    const values = new Array(48).fill(0).map((_, i) => i / 48);
    const intervalData = Nem12Parser.parseIntervalData(
      `300,20050301,${values.join(",")}`,
      30
    );
    expect(intervalData).toEqual({
      recordIndicator: 300,
      intervalDate: new Date("2005-03-01T00:00"),
      intervalValues: values,
    });
  });

  it("should parse a 15-min interval record", () => {
    const values = new Array(96).fill(0).map((_, i) => i / 96);
    const intervalData = Nem12Parser.parseIntervalData(
      `300,20050301,${values.join(",")}`,
      15
    );
    expect(intervalData).toEqual({
      recordIndicator: 300,
      intervalDate: new Date("2005-03-01T00:00"),
      intervalValues: values,
    });
  });

  it("should parse a 5-min interval record", () => {
    const values = new Array(288).fill(0).map((_, i) => i / 288);
    const intervalData = Nem12Parser.parseIntervalData(
      `300,20050301,${values.join(",")}`,
      5
    );
    expect(intervalData).toEqual({
      recordIndicator: 300,
      intervalDate: new Date("2005-03-01T00:00"),
      intervalValues: values,
    });
  });

  it("should parse an end record", () => {
    const end = Nem12Parser.parseEnd("900");
    expect(end).toEqual({
      recordIndicator: 900,
    });
  });

  it("should parse a NEM12 file", () => {
    const parsed = Nem12Parser.parseCsv(nem12CsvString);
    expect(parsed).toEqual(nem12File);
  });
});
