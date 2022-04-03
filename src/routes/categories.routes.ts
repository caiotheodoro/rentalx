import e, { Router } from "express";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import multer from "multer";
import { importCategoryController } from "../modules/cars/useCases/importCategory";


const categoriesRoutes = Router();
const upload = multer({ 
    dest: "./tmp",
    limits: {
        fileSize: 1000000
    }
 });

categoriesRoutes.post("/", (req,res) => {return createCategoryController.handle(req,res)})

categoriesRoutes.get("/", (req,res) => {return listCategoriesController.handle(req,res)})

categoriesRoutes.post("/import", upload.single("file"), (req,res) => {return importCategoryController.handle(req,res)})

export { categoriesRoutes }