import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Received tutorId:");

  try {
    const body = await request.json();
    const { tutorId } = body;

    if (!tutorId) {
      return NextResponse.json({ message: "Missing tutorId" }, { status: 400 });
    }

    const authHeader = request.headers.get("authorization");
    console.log("Authorization header:", authHeader);
    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing Authorization header" },
        { status: 401 }
      );
    }

    const res = await fetch(
      "https://api.eduguin.mtri.online/api/rmq-publisher/event",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          eventType: "view_tutor",
          tutorId,
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Eduguin API error:", text);
      return NextResponse.json(
        { message: "Eduguin API error", detail: text },
        { status: 500 }
      );
    }

    const data = await res.json().catch(() => ({}));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Track view_tutor error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}
