import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    }
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
  

 async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('Email or password incorrect!');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Email or password incorrect!');
        }

        const { name } = user;

        const token = sign({name, email}, 'e6942f38fb197382f80e0cacbb090ac1', {
            subject: user.id,
            expiresIn: '1d'
        })



        return {
            user: {
                name,
                email
            },
            token
        }
    }

}

export { AuthenticateUserUseCase }