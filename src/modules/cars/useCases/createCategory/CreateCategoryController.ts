import { CreateCategoryUseCase } from "./CreateCategoryUsecase";
import {Request, Response} from "express";

class CreateCategoryController {

    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response) : Response {
        const { name, description } = request.body;
    
        this.createCategoryUseCase.execute({name, description});
    
        return response.status(201).send();
    }

}

export {CreateCategoryController}