import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb'
export async function GET() {
    const data = await prisma.medicine.findMany();
    const result = await prisma.risk.findMany();
    const joinedData ={
        data:data,
        result:result
    }
    return NextResponse.json(joinedData);
}