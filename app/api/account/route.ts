import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
  try{

     
    const jwt = req.cookies.get("token")?.value;
    if (!jwt) {

    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
    const payloadbase64 = jwt.split(".")[1];
    const payloadJson = atob(payloadbase64);
    const payload = JSON.parse(payloadJson);
    
     const response = await fetch("http://localhost:8040/user/delete/user/by/id", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      body: JSON.stringify({ userId: payload.userId }),
    });

      const res = NextResponse.json({ message: "Logged in" });
      return res;

//     const subscription_response = await fetch(`https://api.revenuecat.com/v1/subscribers/${userId}/cancel`, {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${process.env.REVENUECAT_API_KEY}`,
//     "Content-Type": "application/json",
//   },
// });

  }catch(error){
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}