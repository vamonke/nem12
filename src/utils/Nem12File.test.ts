import { Nem12File } from "./Nem12File";
import {
  nem12File,
  nem12FileSmall,
  nem12MeterReadings,
} from "../sample/examples";

describe("Nem12File", () => {
  it("toMeterReadings should return an array of MeterReading objects", () => {
    const meterReadings = new Nem12File(nem12File).toMeterReadings();
    expect(meterReadings).toEqual(nem12MeterReadings);
  });

  it("toSqlInsertStatements should return an array of SQL insert statements", () => {
    const insertStatements = new Nem12File(nem12FileSmall).toSqlInsertStatements();
    expect(insertStatements).toEqual([
      "INSERT INTO meter_readings (nmi, timestamp, value) VALUES ('NEM1201009', '2005-03-01 00:00:00', 0);",
      "INSERT INTO meter_readings (nmi, timestamp, value) VALUES ('NEM1201009', '2005-03-01 00:30:00', 0.461);",
      "INSERT INTO meter_readings (nmi, timestamp, value) VALUES ('NEM1201009', '2005-03-01 01:00:00', 0.81);",
    ]);
  });
});
