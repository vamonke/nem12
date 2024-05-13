import { Nem12Parser } from "@/utils/Parser";
import { nem12DataString } from "@/sample/examples";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const nem12Data = "WIP";
  return new Response(JSON.stringify(nem12Data), {
    headers: {
      "content-type": "application/json",
    },
  });
}
