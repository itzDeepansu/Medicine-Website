import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb'
export async function GET() {
    const data = await prisma.medicine.findMany();
    return NextResponse.json(data);
}