import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export async function authMiddleware(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Authentication token is missing' }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string; role: string };
    (request as AuthenticatedRequest).user = decoded;

    return NextResponse.next(); // Continue to the next middleware or route handler
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}

export function authorizeRoles(roles: string[]) {
  return async (request: NextRequest) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    if (!authenticatedRequest.user || !roles.includes(authenticatedRequest.user.role)) {
      return NextResponse.json({ message: 'Access forbidden' }, { status: 403 });
    }
    return NextResponse.next(); // Continue to the next middleware or route handler
  };
}
