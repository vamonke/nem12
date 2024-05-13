"use client";
import { useState } from "react";
import { Nem12File } from "@/utils/Nem12File";
import styles from "./page.module.css";

async function parseCSV(file: File) {
  const reader = new FileReader();
  return new Promise<string[]>((resolve, reject) => {
    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const results = Nem12File.fromCsv(csvData).toSqlInsertStatements();
      resolve(results);
    };
    reader.onerror = (event) => {
      reject(event.target?.error);
    };
    reader.readAsText(file);
  });
}

export default function Home() {
  const [statements, setStatements] = useState<string[] | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedData = await parseCSV(file);
        console.log(parsedData);
        setStatements(parsedData);
      } catch (error) {
        console.error("Error parsing CSV file:", error);
      }
    }
  };

  return (
    <main className={styles.main}>
      <section>
        <div>
          <input type="file" onChange={handleFileUpload} />
        </div>
        <div>
          {statements ? <pre>{statements.join("\n\r")}</pre> : <p>No data</p>}
        </div>
      </section>
    </main>
  );
}
