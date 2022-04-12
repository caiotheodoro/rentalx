import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class ListUsersUseCase {
    constructor(
         @inject("UsersRepository")
         private usersRepository: IUsersRepository
    ) { }

    async execute(user_id: string): Promise<User[]> {
        return await this.usersRepository.list(user_id);
    }

}


export {ListUsersUseCase}