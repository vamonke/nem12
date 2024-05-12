import {
  Nem12End,
  Nem12File,
  Nem12Header,
  Nem12NMIDataDetails,
  StringParser,
} from "../types";
import { parseDate12 } from "./parseDate";

export class Nem12Parser implements StringParser<Nem12File> {
  static parse(content: string): Nem12File {
    const lines = content.split("\n");
    const header = this.parseHeader(lines[0]);
    // const data = this.parseData(lines.slice(1, -1));
    const footer = this.parseFooter(lines[lines.length - 1]);
    return {
      header,
      // data,
      footer,
    };
  }

  /**
   * Parse the NEM12 file header
   * @param content - The NEM12 file header line
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

  // static parseData(lines: string[]): Nem12NMIDataDetails[] {
  //   // Implementation to parse the NMI data details
  // }

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
