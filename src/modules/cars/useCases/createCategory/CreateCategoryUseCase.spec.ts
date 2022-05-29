import { AppError } from "../../../../errors/appError";
import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategorUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;
describe("Create category use case", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategorUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category 1",
            description: "Category 1 description",
        }
        await createCategorUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id");
    })
    it("should not be able to create a new category with name", async () => {
        expect(async () => {
            const category = {
                name: "Category 1",
                description: "Category 1 description",
            }
            await createCategorUseCase.execute({
                name: category.name,
                description: category.description
            })
    
            await createCategorUseCase.execute({
                name: category.name,
                description: category.description
            })

        }).rejects.toBeInstanceOf(AppError);

    })
})