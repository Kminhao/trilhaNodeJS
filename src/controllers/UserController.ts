import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';


class UserController {
    async create(req: Request, res: Response){
        const {name, email} = req.body;
        
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if(userAlreadyExists){
            return res.status(400).json({error: "Usuário já existente!"});
        }

        const user = usersRepository.create({
            name: name,
            email: email
        })

        await usersRepository.save(user);



        return res.status(201).json({message: "Usuário cadastrado!"});
    }

}
export { UserController };
