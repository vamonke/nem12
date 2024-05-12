import { Nem12Parser } from "@/utils/Parser";
import { csvString } from "@/utils/examples";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const nem12File = Nem12Parser.parse(csvString);
  console.log(nem12File);
  return new Response(JSON.stringify(nem12File), {
    headers: {
      "content-type": "application/json",
    },
  });
}
