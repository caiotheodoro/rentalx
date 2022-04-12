import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";



interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    list(user_id: string): Promise <User[]>
}

export { IUsersRepository };