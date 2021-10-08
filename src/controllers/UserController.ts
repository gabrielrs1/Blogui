import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository"
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

class UserController {
    async signUp(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const emailAlreadyUsed = await userRepository.findOne({ email });

        if(emailAlreadyUsed) {
            return response.status(400).json({ message: "Email already used" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = userRepository.create({
            name,
            email,
            password: hash
        });

        await userRepository.save(user);

        return response.status(201).json(user);
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExist = await userRepository.findOne({ email });
        
        if(!userAlreadyExist) {
            return response.status(404).json({ message: "Unregistered email" });
        }

        const compareUserPassword = await bcrypt.compare(password, userAlreadyExist.password);

        if(!compareUserPassword) {
            return response.status(400).json({ message: "Incorrect password" });
        }

        const user = userAlreadyExist.id;

        const token = jwt.sign({ user }, process.env.SECRET_TOKEN, { expiresIn: '3h' });

        return response.status(200).json({ token });
    }
}

export { UserController }