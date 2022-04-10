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

    async execute({name, description}: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new Error('Category already exists');
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase }