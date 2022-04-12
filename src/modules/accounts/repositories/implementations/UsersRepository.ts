import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import {  IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>
  
    constructor() {
        this.repository = getRepository(User);
    }
     async create({name, email, driver_license, password}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            isAdmin: false
        });


         await this.repository.save(user);
        console.log(user)
        return user
    }

    async list(user_id): Promise<User[]> {
        const user = await this.repository.findOne({
            where: {
                id: user_id
            }
        })

        if(!user.isAdmin){
            return this.repository.find();
        }
        else {
            throw new Error("Usario nao e admin!")
        }
        
    }
}


export { UsersRepository };	