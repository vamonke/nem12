import {
  Nem12End,
  Nem12File,
  Nem12Header,
  Nem12IntervalData,
  Nem12NmiDataDetails,
  StringParser,
} from "../types";
import { parseDate12, parseDate8 } from "./parseDate";

export class Nem12Parser implements StringParser<Nem12File> {
  /**
   * Parses a NEM12 header line.
   *
   * @param line The header line. It is expected to be in the format:
   *        "recordIndicator,versionHeader,dateTime,fromParticipant,toParticipant"
   *
   * @returns A Nem12Header object
   *
   * @throws {Error} If the provided line is not in the expected format.
   */
  static parseHeader(line: string): Nem12Header {
    const [
      recordIndicator,
      versionHeader,
      dateTime,
      fromParticipant,
      toParticipant,
    ] = line.split(",");
    return {
      recordIndicator: parseInt(recordIndicator),
      versionHeader,
      dateTime: parseDate12(dateTime),
      fromParticipant,
      toParticipant,
    };
  }

  /**
   * Parses a NEM12 NMI data details record.
   *
   * @param line The NMI data details line. It is expected to be in the format:
   *       "recordIndicator,nmi,nmiConfiguration,registerId,nmiSuffix,mdmDataStreamIdenfier,meterSerialNumber,uom,intervalLength,nextScheduledReadDate"
   *
   * @returns A Nem12NmiDataDetails object
   *
   * @throws {Error} If the provided line is not in the expected format.
   */
  static parseNmiDataDetails(line: string): Nem12NmiDataDetails {
    const [
      recordIndicator,
      nmi,
      nmiConfiguration,
      registerId,
      nmiSuffix,
      mdmDataStreamIdenfier,
      meterSerialNumber,
      uom,
      intervalLength,
      nextScheduledReadDate,
    ] = line.split(",");
    return {
      recordIndicator: parseInt(recordIndicator),
      nmi,
      nmiConfiguration,
      registerId,
      nmiSuffix,
      mdmDataStreamIdenfier,
      meterSerialNumber,
      uom,
      intervalLength: parseInt(intervalLength),
      nextScheduledReadDate: parseDate8(nextScheduledReadDate),
      intervalData: [],
    };
  }
  /**
   * Parses a NEM12 interval data record.
   *
   * @param line The interval data line. It is expected to be in the format:
   *       "recordIndicator,intervalDate,intervalValue1,intervalValue2,...,intervalValueN"
   * @param intervalLength The length of each interval in minutes. It is expected to be 5, 15, or 30.
   *
   * @returns A Nem12IntervalData object
   *
   * @throws {Error} If the provided line is not in the expected format.
   */
  static parseIntervalData(
    line: string,
    intervalLength: number
  ): Nem12IntervalData {
    const values = line.split(",");
    const recordIndicator = values[0];
    const intervalDate = values[1];
    const numIntervals = (24 * 60) / intervalLength; // 24 hours * 60 minutes / intervalLength in minutes
    const intervalValues = values.slice(2, 2 + numIntervals);
    return {
      recordIndicator: parseInt(recordIndicator),
      intervalDate: parseDate8(intervalDate),
      intervalValues: intervalValues.map((value) => parseFloat(value)),
    };
  }

  /**
   * Parses a NEM12 end of data record.
   *
   * @param line The end line. It is expected to be in the format:
   *        "recordIndicator"
   *
   * @returns A Nem12End object
   *
   * @throws {Error} If the provided line is not in the expected format.
   */
  static parseEnd(line: string): Nem12End {
    const [recordIndicator] = line.split(",");
    return {
      recordIndicator: parseInt(recordIndicator),
    };
  }
}
