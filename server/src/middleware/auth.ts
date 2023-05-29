import { type Request, type Response, type NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

const authorize = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    request.userId = decoded.userId;

    next();
  } catch (error) {
    return response.status(401).json({ error: "Unauthorized" });
  }
};

export { authorize };
