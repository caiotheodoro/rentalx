import { Category } from "../../entities/Category";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";
import { injectable, inject } from "tsyringe";

@injectable()
class ListSpecificationUseCase{


    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationRepository) {}

    async execute(): Promise<Category[]> {
        const specifications =  await this.specificationsRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase }