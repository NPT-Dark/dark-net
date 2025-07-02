import { NextResponse } from "next/server";
import { getListUserAction } from "~/actions/user";

export async function GET() {
  const users = await getListUserAction();
  return NextResponse.json(users);
}
