import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../repositories/CategoryRepository";

class CategoryController {
    async create(request: Request, response: Response) {
        const { name } = request.body;

        const categoryRepository = getCustomRepository(CategoryRepository);

        const categoryAlreadyExist = await categoryRepository.findOne({ name });

        if(categoryAlreadyExist) {
            return response.status(400).json({ message: "Category already exists" });
        }
        
        const category = categoryRepository.create({
            name
        });

        await categoryRepository.save(category);

        return response.status(201).json({ category });
    }

    async show(request: Request, response: Response) {
        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository.find();

        return response.status(200).json(category);
    }

    async update(request: Request, response: Response) {
        const { id, name } = request.body;

        const categoryRepository = getCustomRepository(CategoryRepository);

        const categoryAlreadyExist = await categoryRepository.findOne({ id });

        if(!categoryAlreadyExist) {
            return response.status(400).json({ message: "Category does not exist" });
        }

        await categoryRepository.update(id, { name });

        return response.status(200).json({ message: "Updated category" });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const categoryRepository = getCustomRepository(CategoryRepository);

        const categoryAlreadyExist = await categoryRepository.findOne({ id });

        if(!categoryAlreadyExist) {
            return response.status(404).json({ message: "Category not found" });
        }

        await categoryRepository.delete({ id });

        return response.status(200).json({ message: "Deleted category" });
    }
}

export { CategoryController }