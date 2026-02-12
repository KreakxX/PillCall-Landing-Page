import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT");
  }
  const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
  return payload;
}

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

    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const jwt = data.jwt;
  
    let userId;
    try {
      const decodedToken = decodeJWT(jwt);
      userId = decodedToken.userId;
      console.log("Decoded token:", decodedToken);
      console.log("UserId:", userId);
    } catch (decodeError) {
      console.error("JWT decode error:", decodeError);
      return NextResponse.json({ error: "Failed to decode JWT" }, { status: 500 });
    }

    const userResponse = await fetch(`http://localhost:8040/user/user/by/id?userId=${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json"
      }
    });

    console.log("User response status:", userResponse.status);
    
    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("User fetch error:", userResponse.status, errorText);
      return NextResponse.json({ error: "Failed to fetch user data", status: userResponse.status, details: errorText }, { status: 500 });
    }

    const userData = await userResponse.json();
    console.log("User data:", userData);

    const res = NextResponse.json(userData);
    res.cookies.set("token", jwt, { httpOnly: true, path: "/", maxAge: 3600 });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
