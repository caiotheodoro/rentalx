import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoryUseCase{


    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository) {}

    execute(): Promise<Category[]> {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryUseCase }