"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { parseCSV } from "@/lib/csv";

export default function Home() {
  const [statements, setStatements] = useState<string[] | null>(null); // SQL insert statements
  const [loading, setLoading] = useState(false); // Loading state

  /**
   * Handle file upload event
   * @param event - Change event
   */
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
        alert("Failed to process file. Please select a valid NEM12 CSV file.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const output = statements?.join("\n");
  const hasOutput = output && output.length > 0;

  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.header}>NEM12 CSV Parser</h1>
        <p>
          Upload your NEM12 CSV file to automatically parse and generate SQL
          insert statements for your meter readings database.
        </p>
      </section>
      <section className={styles.upload}>
        <div className={styles.actions}>
          {hasOutput && (
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
          )}
          {!hasOutput && (
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".csv"
              disabled={loading}
            />
          )}
        </div>
        {hasOutput && (
          <textarea className={styles.textarea} value={output} readOnly />
        )}
      </section>
    </main>
  );
}
