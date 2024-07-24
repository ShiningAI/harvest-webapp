import { ExceptionError, notifyException } from "@/lib/notify";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { error } = (await request.json()) as {
    error: ExceptionError;
  };

  const resp = await notifyException(error);
  return NextResponse.json(resp);
}
