import { Request,Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";


class ListUsersController {

    async handle(request: Request, response: Response): Promise<Response> {
        const user_id  = request.header("user_id");

        
        const listUsersUseCase =  container.resolve(ListUsersUseCase);
        
        const users = await listUsersUseCase.execute(user_id)

        return response.status(200).json(users)
    }
}


export { ListUsersController }