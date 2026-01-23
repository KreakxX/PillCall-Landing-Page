import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const { email, password } = body;
    const response = await fetch("http://localhost:8040/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    const jwt = data.jwt;

    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const res = NextResponse.json({ message: "Logged in" });
    res.cookies.set("token", jwt, { httpOnly: true, path: "/", maxAge: 3600 });
    return res;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
