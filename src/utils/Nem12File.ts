import { Nem12End, Nem12Header, Nem12NmiDataDetails } from "../types";
import { MeterReading } from "./MeterReading";
import { Nem12Parser } from "./Parser";

export class Nem12File {
  header: Nem12Header;
  data: Nem12NmiDataDetails[];
  end: Nem12End;

  constructor({
    header,
    data,
    end,
  }: {
    header: Nem12Header;
    data: Nem12NmiDataDetails[];
    end: Nem12End;
  }) {
    this.header = header;
    this.data = data;
    this.end = end;
  }

  static fromCsv(csv: string): Nem12File {
    return Nem12Parser.parseCsv(csv);
  }

  toMeterReadings() {
    const map: Record<string, any> = {};
    this.data.forEach((nmiData) => {
      const { nmi, intervalLength } = nmiData;
      map[nmi] = map[nmi] || {};
      nmiData.intervalData.forEach((intervalData) => {
        const date = intervalData.intervalDate;
        intervalData.intervalValues.forEach((value, intervalIndex) => {
          const minutes = intervalIndex * intervalLength;
          const datetime = new Date(date.getTime() + minutes * 60 * 1000);
          const timestamp = datetime.valueOf();
          const current = Number.parseFloat(map[nmi][timestamp] || 0);
          map[nmi][timestamp] = (current + value).toPrecision(5);
        });
      });
    });

    const results: MeterReading[] = [];
    for (const nmi in map) {
      for (const datetime in map[nmi]) {
        results.push({
          nmi,
          timestamp: new Date(parseInt(datetime, 10)),
          value: Number.parseFloat(map[nmi][datetime]),
        });
      }
    }

    return results;
  }

  toSqlInsertStatements() {
    return this.toMeterReadings().map(
      (reading) =>
        `INSERT INTO meter_readings (nmi, timestamp, value) VALUES ('${
          reading.nmi
        }', '${reading.timestamp.toISOString()}', ${reading.value});`
    );
  }
}
