import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const authenticateJWT = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header is missing",
            });
        }

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid authorization format",
            });
        }

        const secret = process.env.JWT_ACCESS_SECRET;

        if (!secret) {
            return res.status(500).json({
                message: "JWT access secret is missing",
            });
        }

        const payload = jwt.verify(token, secret) as {
            sub: string;
            role: string;
        }

        req.user = {
            userId: payload.sub,
            role: payload.role,
        }

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired access token",
        });
    }
};

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};