import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export async function authMiddleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY!);
    // @ts-ignore
    request.user = decoded;
    return null;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export function authorizeRoles(roles: string[]) {
  return async (request: NextRequest) => {
    // @ts-ignore
    const userRole = request.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return null;
  };
}