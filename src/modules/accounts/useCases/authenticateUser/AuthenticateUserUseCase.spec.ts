import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AutheticateUserUseCase"
import { AppError } from "@errors/appError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "User 1",
            driver_license: "123456789",
            email: "teste@teste.com",
            password: "123456",
        }

        await createUserUseCase.execute(user);

        const userAuthenticated = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        })

        console.log(userAuthenticated)

        expect(userAuthenticated).toHaveProperty("token");

    })
    it("should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "pistolinha@viadinho.com",
                password: "euquero-ser-um-pistolinha",
            })
        }).rejects.toBeInstanceOf(AppError);
    })
    it("should not be able to authenticate an user with wrong password", async () => {

        expect(async () => {

            const user: ICreateUserDTO = {
                name: "User 1",
                driver_license: "123456789",
                email: "teste@teste.com",
                password: "123456",
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "euae",
            })
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to authenticate an user with wrong email", async () => {

        expect(async () => {

            const user: ICreateUserDTO = {
                name: "User 1",
                driver_license: "123456789",
                email: "teste@teste.com",
                password: "123456",
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: 'euae@euae.com',
                password: user.password,
            })
        }).rejects.toBeInstanceOf(AppError);
    })
})
