import { generateInsertStatements } from "./MeterReading";
import { Nem12File } from "./Nem12File";
import { nem12File, nem12MeterReadings } from "./examples";

describe("Nem12File", () => {
  it("toMeterReadings should return an array of MeterReading objects", () => {
    const meterReadings = new Nem12File(nem12File).toMeterReadings();
    expect(meterReadings).toEqual(nem12MeterReadings);
  });
});

describe("generateInsertStatements", () => {
  it("should return an array of SQL insert statements", () => {
    const insertStatements = generateInsertStatements([
      {
        nmi: "6123456789",
        timestamp: new Date("2019-03-31T14:00:00.000Z"),
        value: 0,
      },
      {
        nmi: "6123456789",
        timestamp: new Date("2019-03-31T14:30:00.000Z"),
        value: 0,
      },
    ]);
    expect(insertStatements).toEqual([
      "INSERT INTO meter_readings (nmi, timestamp, value) VALUES ('6123456789', '2019-03-31T14:00:00.000Z', 0);",
      "INSERT INTO meter_readings (nmi, timestamp, value) VALUES ('6123456789', '2019-03-31T14:30:00.000Z', 0);",
    ]);
  });
});
