// middleware/authMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export async function authMiddleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    if (!SECRET_KEY) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Token verified successfully', decoded);
    // @ts-ignore
    request.user = decoded;
    return null;
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export function authorizeRoles(roles: string[]) {
  return async (request: NextRequest) => {
    // @ts-ignore
    const userRole = request.user?.role;
    console.log('User role:', userRole);

    if (!userRole || !roles.includes(userRole)) {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return null;
  };
}