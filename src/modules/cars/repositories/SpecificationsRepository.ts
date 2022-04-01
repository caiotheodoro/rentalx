import { Specification } from "../model/Specification";
import { ISpecificationRepository } from "./ISpecificationsRepository";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

class SpecificationsRepository implements ISpecificationRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({name,description}: ICreateSpecificationDTO) : void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });
       
        this.specifications.push(specification);
    }
    findByName(name: string): Specification {
        const specification = this.specifications.find(category => category.name === name);

        return specification;
    }

    
    list(): Specification[] {
        return this.specifications;
    }

}

export { SpecificationsRepository };