import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(
      { 
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'API is healthy',
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version,
        uptime: process.uptime()
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 