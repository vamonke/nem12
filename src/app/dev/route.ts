import { Nem12Parser } from "@/utils/Parser";
import { nem12CsvString } from "@/utils/examples";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const nem12File = Nem12Parser.parse(nem12CsvString);
  console.log(nem12File);
  return new Response(JSON.stringify(nem12File), {
    headers: {
      "content-type": "application/json",
    },
  });
}
