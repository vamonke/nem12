export interface MeterReading {
  nmi: string;
  timestamp: Date;
  value: number;
}

export function generateInsertStatements(meterReadings: MeterReading[]) {
  return meterReadings.map(({ nmi, timestamp, value }) => {
    return `INSERT INTO meter_readings (nmi, timestamp, value) VALUES ('${nmi}', '${timestamp.toISOString()}', ${value});`;
  });
}

/*
{
  [nmi]: {
    [timestamp]: number,
    [timestamp]: number,
    [timestamp]: number,
    [timestamp]: number,
  }
}
*/
