export interface Nem12Header {
  recordIndicator: number; // 100
  versionHeader: string;
  dateTime: Date;
  fromParticipant: string;
  toParticipant: string;
}

export interface Nem12NmiDataDetails {
  recordIndicator: number; // 200
  nmi: string;
  nmiConfiguration: string;
  registerId: string;
  nmiSuffix: string;
  mdmDataStreamIdenfier: string;
  meterSerialNumber: string;
  uom: string;
  intervalLength: number;
  nextScheduledReadDate: Date;
  intervalData: Nem12IntervalData[];
}

export interface Nem12IntervalData {
  recordIndicator: number; // 300
  intervalDate: Date;
  intervalValues: number[];
  qualityMethod?: string;
  reasonCode?: number;
  reasonDescription?: string;
  updateDateTime?: Date;
  msatsLoadDateTime?: Date;
  intervalEvents?: Nem12IntervalEvent[];
  b2bDetails?: Nem12B2bDetails[];
}

export interface Nem12IntervalEvent {
  recordIndicator: number; // 400
  startInterval: number;
  endInterval: number;
  qualityMethod: string;
  reasonCode: number;
  reasonDescription: string;
}

export interface Nem12B2bDetails {
  recordIndicator: number; // 500
  transCode: string;
  retServiceOrder: string;
  readDateTime: Date;
  indexRead: number;
}

export interface Nem12End {
  recordIndicator: number; // 900
}

export interface MeterReading {
  nmi: string;
  timestamp: Date;
  value: number;
}
