export interface StringParser<T> {
  // parse(content: string): T;
}

export interface Nem12File {
  header: Nem12Header;
  data: Nem12NMIDataDetails[];
  footer: Nem12End;
}

export interface Nem12Header {
  recordIndicator: number;
  versionHeader: string;
  dateTime: Date;
  fromParticipant: string;
  toParticipant: string;
}

export interface Nem12NMIDataDetails {
  recordIndicator: number;
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
  recordIndicator: number;
  intervalDate: Date;
  intervalValues: number[];
  qualityMethod: string;
  reasonCode: number;
  reasonDescription: string;
  updateDateTime: Date;
  msatsLoadDateTime: Date;
  intervalEvents: Nem12IntervalEvent[];
  b2bDetails: Nem12B2BDetails[];
}

export interface Nem12IntervalEvent {
  recordIndicator: number;
  startInterval: number;
  endInterval: number;
  qualityMethod: string;
  reasonCode: number;
  reasonDescription: string;
}

export interface Nem12B2BDetails {
  recordIndicator: number;
  transCode: string;
  retServiceOrder: string;
  readDateTime: Date;
  indexRead: number;
}

export interface Nem12End {
  recordIndicator: number;
}
