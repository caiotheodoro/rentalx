import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
    iat: number;
    exp: number;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {

        const { sub: user_id } = verify(token, 'e6942f38fb197382f80e0cacbb090ac1') as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found', 401);
        }

        return next();

    } catch (error) {
        throw new AppError('Invalid JWT token', 401);
    }    
}