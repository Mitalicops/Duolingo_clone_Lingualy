import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { IsAdmin } from "@/lib/admin";
import { lessons } from "@/db/schema";

export const GET = async () => {
  if (!IsAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.lessons.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!IsAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(lessons).values({
    ...body,
  }).returning();

  return NextResponse.json(data[0]);
};