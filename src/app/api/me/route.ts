import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${session.user.jwt}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
