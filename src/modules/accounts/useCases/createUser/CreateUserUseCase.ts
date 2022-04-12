import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";


@injectable()
class CreateUserUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }


    async execute({ driver_license, email, name, password }: ICreateUserDTO): Promise<User> {


        const user = await this.usersRepository.create({
            driver_license,
            email,
            name,
            password,
        })

        return user
        
    }

}

export { CreateUserUseCase };