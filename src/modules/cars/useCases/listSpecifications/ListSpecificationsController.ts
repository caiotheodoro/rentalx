import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationsController {
  constructor(private readonly listSpecificationsUseCase: ListSpecificationUseCase) {}

   handle(request: Request, response: Response): Response {
    
    const specifications = this.listSpecificationsUseCase.execute();

    return response.json(specifications);

  }
}

export { ListSpecificationsController };