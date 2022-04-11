import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response} from 'express'

class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { driver_license, email, name, password, username } = request.body;


        const createUserUseCase =  container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            driver_license,
            email,
            name,
            password,
            username
        })

        return response.status(201).send();
    }
}

export { CreateUserController };