import Papa from "papaparse";
import { formatTimestamp, parseDate8 } from "./parseDate";

export async function parseCSV(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const records: { [key: string]: Nem12File } = {};
    let currentNmi: string | null = null;
    let currentIntervalLength: number | null = null;

    Papa.parse(file, {
      worker: true, // Use worker thread for large files
      step: (row: Papa.ParseResult<string>) => {
        [currentNmi, currentIntervalLength] = Nem12File.processRow(
          row.data,
          currentNmi,
          currentIntervalLength,
          records
        );
      },
      complete: () => {
        const results: string[] = [];
        for (const nmi in records) {
          results.push(...records[nmi].toSqlInsertStatements());
        }
        resolve(results);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

interface IntervalData {
  intervalDate: string;
  consumptionValues: number[];
}

class Nem12File {
  nmi: string;
  intervalLength: number;
  intervals: { [key: string]: IntervalData };

  constructor(nmi: string, intervalLength: number) {
    this.nmi = nmi;
    this.intervalLength = intervalLength;
    this.intervals = {};
  }

  static processRow(
    row: string[],
    currentNmi: string | null,
    currentIntervalLength: number | null,
    records: { [key: string]: Nem12File }
  ): [string | null, number | null] {
    const recordType = row[0];

    if (recordType === "200") {
      const nmi = row[1];
      const intervalLength = parseInt(row[8], 10);
      if (!records[nmi]) {
        records[nmi] = new Nem12File(nmi, intervalLength);
      }
      return [nmi, intervalLength];
    } else if (
      recordType === "300" &&
      currentNmi &&
      currentIntervalLength !== null
    ) {
      const intervalDate = row[1];
      const consumptionValues = row
        .slice(2, currentIntervalLength + 2)
        .map((value) => parseFloat(value));

      if (!records[currentNmi].intervals[intervalDate]) {
        records[currentNmi].intervals[intervalDate] = {
          intervalDate,
          consumptionValues: new Array(consumptionValues.length).fill(0),
        };
      }

      for (let i = 0; i < consumptionValues.length; i++) {
        records[currentNmi].intervals[intervalDate].consumptionValues[i] +=
          consumptionValues[i];
      }
    }

    return [currentNmi, currentIntervalLength];
  }

  toSqlInsertStatements(): string[] {
    const statements: string[] = [];
    for (const intervalDate in this.intervals) {
      const intervalData = this.intervals[intervalDate];
      for (let i = 0; i < intervalData.consumptionValues.length; i++) {
        const timestamp = parseDate8(intervalData.intervalDate);
        timestamp.setMinutes(timestamp.getMinutes() + this.intervalLength * i);
        const consumption = intervalData.consumptionValues[i];
        statements.push(
          `INSERT INTO meter_readings (nmi, timestamp, consumption) VALUES ('${
            this.nmi
          }', '${formatTimestamp(timestamp)}', ${consumption});`
        );
      }
    }

    return statements;
  }
}

export { Nem12File };
