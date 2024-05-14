import { Nem12File } from "./Nem12File";

describe("Nem12File", () => {
  let nem12File: Nem12File;

  beforeEach(() => {
    nem12File = new Nem12File();
  });

  describe("processNmiDataRow", () => {
    it("should process NMI data details row and update records", () => {
      const row = ["200", "NMI123", "", "", "", "", "", "", "30"];

      nem12File.processNmiDataRow(row);

      expect(nem12File.currentNmi).toBe("NMI123");
      expect(nem12File.currentIntervalLength).toBe(30);
      expect(nem12File.records["NMI123"]).toBeDefined();
      expect(nem12File.records["NMI123"].nmi).toBe("NMI123");
      expect(nem12File.records["NMI123"].intervalLength).toBe(30);
    });

    it("should throw an error if NMI data details are missing", () => {
      const row = ["200", "", "", "", "", "", "", "", ""];

      expect(() => nem12File.processNmiDataRow(row)).toThrow(
        "Missing NMI data details"
      );
    });
  });

  describe("processIntervalDataRow", () => {
    it("should process interval data row and update consumption values", () => {
      const nmiDataRow = ["200", "NMI123", "", "", "", "", "", "", "30"];
      nem12File.processNmiDataRow(nmiDataRow);

      const intervalDataRow = ["300", "20220101", "1.5", "2.0", "2.5"];

      nem12File.processIntervalDataRow(intervalDataRow);

      const intervals = nem12File.records["NMI123"].intervals;
      expect(intervals["20220101"]).toBeDefined();
      expect(intervals["20220101"].consumptionValues).toEqual([1.5, 2.0, 2.5]);
    });

    it("should throw an error if interval data is missing", () => {
      const nmiDataRow = ["200", "NMI123", "", "", "", "", "", "", "30"];
      nem12File.processNmiDataRow(nmiDataRow);

      const intervalDataRow = ["300", "", "1.5", "2.0", "2.5"];

      expect(() => nem12File.processIntervalDataRow(intervalDataRow)).toThrow(
        "Missing interval data"
      );
    });

    it("should skip processing if NMI data details are not set", () => {
      const intervalDataRow = ["300", "20220101", "1.5", "2.0", "2.5"];
      nem12File.processIntervalDataRow(intervalDataRow);

      expect(nem12File.records).toEqual({});
    });
  });

  describe("toSqlInsertStatements", () => {
    it("should generate SQL insert statements for NMI records", () => {
      const nmiDataRow = ["200", "NMI123", "", "", "", "", "", "", "30"];
      nem12File.processNmiDataRow(nmiDataRow);

      const intervalDataRow = ["300", "20220101", "1.5", "2.0", "2.5"];

      nem12File.processIntervalDataRow(intervalDataRow);

      const sqlStatements = nem12File.toSqlInsertStatements();

      expect(sqlStatements).toEqual([
        `INSERT INTO meter_readings (nmi, timestamp, consumption) VALUES ('NMI123', '2022-01-01 00:00', 1.5);`,
        `INSERT INTO meter_readings (nmi, timestamp, consumption) VALUES ('NMI123', '2022-01-01 00:30', 2);`,
        `INSERT INTO meter_readings (nmi, timestamp, consumption) VALUES ('NMI123', '2022-01-01 01:00', 2.5);`,
      ]);
    });
  });
});
