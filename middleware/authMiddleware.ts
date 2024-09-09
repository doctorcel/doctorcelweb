import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: number
    email: string
    role: string
  }
}

export function authMiddleware(handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' })
      }

      const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string; role: string }
      req.user = decoded

      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  }
}

export function authorizeRoles(roles: string[]) {
  return (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden' })
    }
    next()
  }
}