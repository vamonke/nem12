import {
  Nem12End,
  Nem12File,
  Nem12Header,
  Nem12NMIDataDetails,
  StringParser,
} from "@/types";

export class Nem12Parser implements StringParser<Nem12File> {
  static parse(content: string): Nem12File {
    const lines = content.split("\n");
    const header = this.parseHeader(lines[0]);
    // const footer = this.parseFooter(lines[lines.length - 1]);
    // const data = this.parseData(lines.slice(1, -1));
    return {
      header,
      // data,
      // footer,
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
      dateTime, // Assuming the format is "YYYYMMDDHHmm"
      fromParticipant,
      toParticipant,
    ] = line.split(",");

    if (recordIndicator !== "100") {
      throw new Error("Invalid header record indicator");
    }
    if (versionHeader !== "NEM12") {
      throw new Error("Invalid header version header");
    }
    if (!/^\d{12}$/.test(dateTime)) {
      throw new Error("Invalid header date time");
    }
    if (fromParticipant.length === 0) {
      throw new Error("Invalid header from participant");
    }
    if (toParticipant.length === 0) {
      throw new Error("Invalid header to participant");
    }

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

  // static parseFooter(line: string): Nem12End {
  //   // Implementation to parse the footer line
  // }
}

function parseDate12(dateStr: string) {
  // Assuming the format is "YYYYMMDDHHmm"
  var year = parseInt(dateStr.substring(0, 4), 10);
  var month = parseInt(dateStr.substring(4, 6), 10) - 1;
  var day = parseInt(dateStr.substring(6, 8), 10);
  var hour = parseInt(dateStr.substring(8, 10), 10);
  var minute = parseInt(dateStr.substring(10, 12), 10);

  return new Date(year, month, day, hour, minute);
}
