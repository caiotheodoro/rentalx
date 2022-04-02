import { Category } from "../../model/Category";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";



class ListSpecificationUseCase{


    constructor(private specificationsRepository: ISpecificationRepository) {}

    execute(): Category[] {
        const specifications = this.specificationsRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase }