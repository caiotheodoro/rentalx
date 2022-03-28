import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
const categoriesRoutes = Router();

const categories: Category[] = [];
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post("/", (req,res) => {
    const { name, description } = req.body;
    categoriesRepository.create({name, description});
   

    return res.status(201).send();
})

categoriesRoutes.get("/", (req,res) => {
    const all = categoriesRepository.list();

    return res.status(200).json(all);
})


export { categoriesRoutes }