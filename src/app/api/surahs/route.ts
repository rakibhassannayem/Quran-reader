import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/surah", {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) {
      return NextResponse.json([], { status: 500 });
    }

    const json = await res.json();
    return NextResponse.json(json.data);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
