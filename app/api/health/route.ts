import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(
      { 
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'API is healthy'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 