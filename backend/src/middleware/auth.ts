import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";

import "dotenv/config";
import env from "../util/validateEnv";

export const verifyJWT: RequestHandler = (req, res, next) => {
    const token = req.cookies['jwt-access']
    
    verify(
        token,
        env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err) {
                throw createHttpError(403, "Forbidden");
            }
            req.body.username = decoded.UserInfo.username
            req.body.userId = decoded.UserInfo.userId
            next()
        }
    )
};