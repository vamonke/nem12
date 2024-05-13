import {
  Nem12End,
  Nem12Header,
  Nem12NmiDataDetails,
  MeterReading,
} from "../types";
import { Nem12Parser } from "./Parser";
import { convertDateTo12, formatTimestamp, parseDate12 } from "./parseDate";

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
          const date12 = convertDateTo12(datetime);
          const current = Number.parseFloat(map[nmi][date12] || 0);
          map[nmi][date12] = (current + value).toPrecision(5);
        });
      });
    });

    const results: MeterReading[] = [];
    for (const nmi in map) {
      for (const date12 in map[nmi]) {
        results.push({
          nmi,
          timestamp: parseDate12(date12),
          value: Number.parseFloat(map[nmi][date12]),
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
        }', '${formatTimestamp(reading.timestamp)}', ${reading.value});`
    );
  }
}
