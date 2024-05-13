import { Nem12File } from "./Nem12File";
import { nem12File, nem12MeterReadings } from "./examples";

describe("Nem12File", () => {
  it("toMeterReadings should return an array of MeterReading objects", () => {
    const meterReadings = new Nem12File(nem12File).toMeterReadings();
    expect(meterReadings).toEqual(nem12MeterReadings);
  });
});
