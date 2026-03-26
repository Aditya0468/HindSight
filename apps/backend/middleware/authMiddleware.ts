import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthReq } from "../types/express";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // see the userId here 
    req.userId = decoded.userId ;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};

export default authMiddleware;