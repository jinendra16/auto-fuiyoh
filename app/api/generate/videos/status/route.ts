import { NextResponse } from 'next/server';
import { pollVideoOperation } from '@/lib/veo';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const operationName = searchParams.get('op');

    if (!operationName) {
      return NextResponse.json({ error: 'Missing op parameter' }, { status: 400 });
    }

    const result = await pollVideoOperation(operationName);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Video Status API Error:', error);
    return NextResponse.json({ error: 'Failed to poll video status' }, { status: 500 });
  }
}
