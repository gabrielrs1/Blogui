import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

class UserMiddleware {
    middleware(request: Request, response: Response, next: NextFunction) {
        const token: any = request.headers['authentication'];

        jwt.verify(token, process.env.SECRET_TOKEN, (err: object) => {
            if (err) return response.status(400).json({ message: 'Authentication failed, you are not logged in' });

            next();
        });
    }
}

export { UserMiddleware }