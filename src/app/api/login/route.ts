import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const MASTER_PASSWORD = process.env.MASTER_PASSWORD || 'u7p5h3t8r';
const AUTH_COOKIE_NAME = 'dev-auth';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const { password } = await request.json();

    if (password === MASTER_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set(AUTH_COOKIE_NAME, 'true', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return response;
    } else {
      return NextResponse.json({ message: 'Incorrect password.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}
