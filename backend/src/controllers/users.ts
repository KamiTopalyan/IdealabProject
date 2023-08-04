import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import "dotenv/config";
import env from "../util/validateEnv";

export const getAuthenticatedUser: RequestHandler = async (req: any, res, next) => {
    try {
        const user = await UserModel.findById(req.userId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}



export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please choose a different one or log in instead.");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

    const accessToken = sign(
        {
            "UserInfo": {
                "username": user.username,
                "userId": user._id,
            }
        },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = sign(
        {
            "UserInfo": {
                "username": user.username,
                "userId": user._id,
            }
        },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
    // Create secure cookie with refresh token 
    res.cookie('jwt-refresh', refreshToken, {
        httpOnly: true, //works only in http
        sameSite: 'strict', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })


    res.json({accessToken});

    } catch (error) {
        next(error);
    }
};

export const refresh: RequestHandler = (req, res, next) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const refreshToken = cookies.jwt;

    verify(
        refreshToken,
        env.REFRESH_TOKEN_SECRET,
        async (err: any, decoded: any) => {
            if(err) {
                throw createHttpError(403, "Forbidden");
            }

            const user = await UserModel.findOne({ username: decoded.UserInfo.username }).exec();

            if (!user) {
                throw createHttpError(401, "Invalid credentials");
            }

            const accessToken = sign(
                {
                    "UserInfo": {
                        "username": user.username,
                        "userId": user._id,
                    }
                },
                env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })

        }
    )
}

export const logout: RequestHandler = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict'})
    res.json({ message: 'Cookie cleared' })
};