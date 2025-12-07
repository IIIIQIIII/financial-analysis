import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (session?.value) {
      return NextResponse.json({
        authenticated: true,
        user: {
          email: process.env.ADMIN_EMAIL,
          username: process.env.ADMIN_USERNAME,
        },
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}
