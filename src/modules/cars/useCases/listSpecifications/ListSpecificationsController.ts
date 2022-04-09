import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";
import { container } from "tsyringe";
class ListSpecificationsController {

   async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(ListSpecificationUseCase);

    const specifications = await listSpecificationsUseCase.execute();

    return response.json(specifications);

  }
}

export { ListSpecificationsController };