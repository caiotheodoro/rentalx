import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";
import { injectable, inject } from "tsyringe";
interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase{

    
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationRepository) {}

    execute({name, description}: IRequest): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new Error('Category already exists');
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase }