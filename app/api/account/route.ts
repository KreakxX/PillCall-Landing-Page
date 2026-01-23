import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
  try{

    const body = await req.json();
    const {userId} = body;

     const response = await fetch("http://localhost:8040/user/delete/user/by/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const subscription_response = await fetch(`https://api.revenuecat.com/v1/subscribers/${userId}/cancel`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.REVENUECAT_API_KEY}`,
    "Content-Type": "application/json",
  },
});

  }catch(error){
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

  }
}