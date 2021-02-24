import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";

class SurveyController {

    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const surveyRepository = getCustomRepository(SurveyRepository);

        const survey = surveyRepository.create({
            title, description
        })


        await surveyRepository.save(survey);


        return res.status(201).json({ message: "Pesquisa cadastrada!" });

    }


    async show(req: Request, res: Response) {
        const surveyRepository = getCustomRepository(SurveyRepository);

        const data = await surveyRepository.find();


        return res.json(data);

    }

}



export { SurveyController }