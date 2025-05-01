import { NextResponse } from "next/server";

export function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    console.log(searchParams.get("name"))
    return NextResponse.json({message: "Hello"}, {status: 200})
    
}

export async function POST(request: Request) {
    const body = await request.json()
    console.log(body)
    return NextResponse.json({payload: body}, {status: 200})
}

