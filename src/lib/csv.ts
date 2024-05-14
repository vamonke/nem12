import Papa from "papaparse";
import { Nem12File } from "./Nem12File";

/**
 * Parse a NEM12 CSV file and return an array of SQL insert statements
 * @param file - CSV file to parse
 * @returns Array of SQL insert statements
 */
export async function parseCSV(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const nem12File = new Nem12File();
    Papa.parse(file, {
      worker: true, // Use worker thread for large files
      step: (row: Papa.ParseResult<string>) => {
        nem12File.processRow(row.data);
      },
      complete: () => {
        const results = nem12File.toSqlInsertStatements();
        resolve(results);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}
