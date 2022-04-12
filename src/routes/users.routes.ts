import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/ListUsersController";


const usersRoutes = Router();
const createUserController =  new CreateUserController();
const listUsersController  = new ListUsersController()

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);
// usersRouter.get("/", );


export { usersRoutes };