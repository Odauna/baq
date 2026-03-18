import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";


// GET Users
export async function GET() {
  await dbConnect();
  const users = await User.find({kegiatan: "Zakat"});
  return NextResponse.json(users);
}
