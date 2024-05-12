import {
  Nem12End,
  Nem12File,
  Nem12Header,
  Nem12IntervalData,
  Nem12NMIDataDetails,
  StringParser,
} from "../types";
import { parseDate12, parseDate8 } from "./parseDate";

export class Nem12Parser implements StringParser<Nem12File> {
  /**
   * Parse the NEM12 file header
   * @param line - The NEM12 file header line
   * @returns The parsed NEM12 header
   * @throws Error if the header line is invalid
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
   * Parse the NEM12 file data details
   * @param lines - The NEM12 file data details lines
   * @returns The parsed NEM12 data details
   * @throws Error if the data details lines are invalid
   */
  static parseDataDetails(line: string): Nem12NMIDataDetails {
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
   * Parse the NEM12 file 30min interval data
   * @param line - The NEM12 file 30min interval data line
   * @returns The parsed NEM12 30min interval data
   * @throws Error if the 30min interval data line is invalid
   */
  static parse30IntervalData(line: string): Nem12IntervalData {
    const values = line.split(",");
    const recordIndicator = values[0];
    const intervalDate = values[1];
    const numIntervals = 1440 / 30; // 1440 mins in a day, 30 min intervals
    const intervalValues = values.slice(2, 2 + numIntervals);
    return {
      recordIndicator: parseInt(recordIndicator),
      intervalDate: parseDate8(intervalDate),
      intervalValues: intervalValues.map((value) => parseFloat(value)),
      intervalEvents: [],
      b2bDetails: [],
    };
  }

  /**
   * Parse the NEM12 file footer
   * @param content - The NEM12 file footer line
   * @returns The parsed NEM12 footer
   * @throws Error if the footer line is invalid
   */
  static parseFooter(line: string): Nem12End {
    const [recordIndicator] = line.split(",");
    return {
      recordIndicator: parseInt(recordIndicator),
    };
  }
}
