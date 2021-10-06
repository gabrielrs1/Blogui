import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../repositories/PostRepository";

class PostController {
    async create(request: Request, response: Response) {
        const { title, description, category_id } = request.body;

        const postRepository = getCustomRepository(PostRepository);

        // procura pelo titulo
        const postTitleAlreadyExists = await postRepository.find({
            where: {
                title
            }
        });

        if(postTitleAlreadyExists[0]?.title == title) {
            return response.status(400).json({ message: "Title already exists" });
        }

        const post = postRepository.create({
            title,
            description,
            category_id
        });

        await postRepository.save(post);

        return response.status(201).json(post);
    }

    async show(request: Request, response: Response) {
        const postRepository = getCustomRepository(PostRepository);

        const posts = await postRepository.find();

        return response.status(200).json(posts);
    }

    async update(request: Request, response: Response) {
        const { id, title, description, category_id } = request.body;

        const postRepository = getCustomRepository(PostRepository);

        const postAlreadyExists = await postRepository.findOne(id);

        if(!postAlreadyExists) {
            return response.status(404).json({ message: "Post not found" });
        }

        await postRepository.update(id, {
            title,
            description,
            category_id
        });

        return response.status(200).json({ message: "Updated post" });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const postRepository = getCustomRepository(PostRepository);

        const postAlreadyExists = await postRepository.findOne(id);

        if(!postAlreadyExists) {
            return response.status(404).json({ message: "Post not found" });
        }

        await postRepository.delete(id);

        return response.status(200).json({ message: "Deleted post" });
    }
}

export { PostController }