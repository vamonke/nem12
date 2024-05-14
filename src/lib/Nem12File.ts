import { formatDate, parseDate8 } from "@/lib/date";
import { preciseAdd } from "@/lib/math";

class Nem12File {
  records: { [key: string]: NmiRecord };
  currentNmi: string | null = null;
  currentIntervalLength: number | null = null;

  static INDICATOR = {
    HEADER: "100",
    NMI_DATA_DETAILS: "200",
    INTERVAL_DATA: "300",
    END: "900",
  };

  /**
   * Creates an instance of Nem12File.
   */
  constructor() {
    this.records = {};
    this.currentNmi = null;
    this.currentIntervalLength = null;
  }

  /**
   * Processes a row of data from the NEM12 file.
   * @param {string[]} row - The row of data.
   * @returns {void}
   */
  processRow(row: string[]): void {
    const recordType = row[0];
    switch (recordType) {
      case Nem12File.INDICATOR.NMI_DATA_DETAILS:
        this.processNmiDataRow(row);
        break;
      case Nem12File.INDICATOR.INTERVAL_DATA:
        this.processIntervalDataRow(row);
        break;
      default:
        break;
    }
  }

  /**
   * Processes NMI data details row.
   * @param {string[]} row - The NMI data details row.
   * @returns {void}
   */
  processNmiDataRow(row: string[]): void {
    // Extract NMI data details
    if (!row[1] || !row[8]) {
      throw new Error("Missing NMI data details");
    }
    const nmi = row[1];
    const intervalLength = parseInt(row[8], 10);

    // Create NMI record if it doesn't exist
    if (!this.records[nmi]) {
      this.records[nmi] = new NmiRecord(nmi, intervalLength);
    }

    // Update current NMI and interval length
    this.currentNmi = nmi;
    this.currentIntervalLength = intervalLength;
  }

  /**
   * Processes interval data row.
   * @param {string[]} row - The interval data row.
   * @returns {void}
   */
  processIntervalDataRow(row: string[]): void {
    // Skip interval data if NMI data details has not been processed
    if (!this.currentNmi || this.currentIntervalLength === null) {
      return;
    }

    // Extract interval data
    const intervalDate = row[1];
    if (!intervalDate) {
      throw new Error("Missing interval data");
    }
    const consumptionValues = row
      .slice(2, this.currentIntervalLength + 2)
      .map((value) => parseFloat(value));

    const nmiRecord = this.records[this.currentNmi];

    // Create interval data if it doesn't exist
    if (!nmiRecord.intervals[intervalDate]) {
      ``;
      nmiRecord.intervals[intervalDate] = {
        intervalDate,
        consumptionValues: new Array(consumptionValues.length).fill(0),
      };
    }

    // Add consumption values to existing values
    const intervalData = nmiRecord.intervals[intervalDate];
    consumptionValues.forEach((value, i) => {
      intervalData.consumptionValues[i] = preciseAdd(
        intervalData.consumptionValues[i],
        value
      );
    });
  }

  /**
   * Generates SQL insert statements for the NEM12 file.
   * @returns {string[]} An array of SQL insert statements.
   */
  toSqlInsertStatements(): string[] {
    const results: string[] = [];
    for (const nmi in this.records) {
      results.push(...this.records[nmi].toSqlInsertStatements());
    }
    return results;
  }
}

interface IntervalData {
  intervalDate: string;
  consumptionValues: number[];
}

class NmiRecord {
  nmi: string;
  intervalLength: number;
  intervals: { [key: string]: IntervalData };

  /**
   * Creates an instance of NmiRecord.
   * @param {string} nmi - The NMI identifier.
   * @param {number} intervalLength - The interval length in minutes.
   */
  constructor(nmi: string, intervalLength: number) {
    this.nmi = nmi;
    this.intervalLength = intervalLength;
    this.intervals = {};
  }

  /**
   * Generates SQL insert statements for the NMI record.
   * @returns {string[]} An array of SQL insert statements.
   */
  toSqlInsertStatements(): string[] {
    const statements: string[] = [];
    for (const intervalDate in this.intervals) {
      const intervalData = this.intervals[intervalDate];
      intervalData.consumptionValues.forEach((consumption, i) => {
        const timestamp = parseDate8(intervalData.intervalDate);
        timestamp.setMinutes(timestamp.getMinutes() + this.intervalLength * i);
        statements.push(
          `INSERT INTO meter_readings (nmi, timestamp, consumption) VALUES ('${
            this.nmi
          }', '${formatDate(timestamp)}', ${consumption});`
        );
      });
    }
    return statements;
  }
}

export { Nem12File };
