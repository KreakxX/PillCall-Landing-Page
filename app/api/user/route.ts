import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const jwt = req.cookies.get("token")?.value;
    if(!jwt){
    return NextResponse.json({ error: "No Token" }, { status: 401 });

    }
    const res = NextResponse.json({ message: "Token", jwt: jwt });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
