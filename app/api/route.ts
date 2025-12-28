import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ message: 'LX NaN Store API' })
}
