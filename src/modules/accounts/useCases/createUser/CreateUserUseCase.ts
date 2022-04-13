import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from 'bcryptjs'
import { AppError } from "../../../../errors/appError";

@injectable()
class CreateUserUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }


    async execute({ driver_license, email, name, password,avatar,id }: ICreateUserDTO): Promise<void> {


        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const hashedPassword = await hash(password, 8)
        
        await this.usersRepository.create({
            driver_license,
            email,
            name,
            password: hashedPassword,
            avatar,
            id
        })


        
    }

}

export { CreateUserUseCase };