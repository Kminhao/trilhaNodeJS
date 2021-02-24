import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should show surveys", async () => {
        const response = await request(app).get('/surveys').send();
        
        expect(response.status).toBe(200);
    })

    it("Should add a new survey", async() => {
        const response = await request(app).post('/surveys').send({
            title: "Algoritmo de teste",
            description : "Apenas testando"
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        
    })
})