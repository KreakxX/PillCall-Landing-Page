import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT");
  }

  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
  return payload;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    let userId;
    try {
      const decodedToken = decodeJWT(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Invalid JWT token:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const userResponse = await fetch(
      `https://pillcall.duckdns.org:8050/pillcall/user/user/by/id?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Failed to fetch user data:", userResponse.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch user data", details: errorText },
        { status: userResponse.status },
      );
    }

    const userData = await userResponse.json();
    const res = NextResponse.json({ user: userData });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 3600,
    });
    return res;
  } catch (error) {
    console.error("Google login callback error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
