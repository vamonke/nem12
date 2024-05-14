"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { parseCSV } from "@/utils/csv";

export default function Home() {
  const [statements, setStatements] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const parsedData = await parseCSV(file);
        setStatements(parsedData);
      } catch (error) {
        console.error("Error parsing CSV file:", error);
        alert("Error parsing CSV file. Please select a valid NEM12 CSV file.");
      }
      setLoading(false);
    } else {
      console.log("No file selected");
    }
  };

  const output = statements?.join("\n");
  const hasOutput = output && output.length > 0;

  return (
    <main className={styles.main}>
      <h1>NEM12 CSV Parser</h1>
      <section className={styles.section}>
        <div className={styles.actions}>
          {hasOutput ? (
            <>
              <button onClick={() => setStatements(null)}>Clear</button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(output);
                }}
                className={styles.copy}
              >
                Copy to Clipboard
              </button>
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  output
                )}`}
                download="output.sql"
                className={styles.download}
              >
                Download SQL
              </a>
            </>
          ) : (
            <input type="file" onChange={handleFileUpload} accept=".csv" />
          )}
        </div>
        {loading && !hasOutput && (
          <textarea
            className={styles.textarea}
            value={"Parsing CSV..."}
            readOnly
          />
        )}
        {hasOutput && (
          <textarea className={styles.textarea} value={output} readOnly />
        )}
      </section>
    </main>
  );
}
