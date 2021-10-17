import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from "../database";

let token = '';

interface CategoryId {
    id: string;
}

describe("Category", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async() => {
        const connection = getConnection();
        await connection.close();
    });

    it("Should be able login in application", async () => {
        const response = await request(app).post("/login").send({
            email: "gabriellribeiro208@gmail.com",
            password: "senha1"
        });

        token = response.body.token;

        expect(response.status).toBe(200);
    });

    it("Should not be able to create a category with exist name", async () => {
        const response = await request(app).post("/category").set('authentication', token).send({
            name: "Teste1"
        });

        expect(response.status).toBe(201);
    });

    it("Should be able to show all categories exists", async () => {
        const response = await request(app).get("/category");

        expect(response.status).toBe(200);
    })

    it("Should be able to update a category exist", async () => {
        const response = await request(app).get("/category");

        let categories = response.body;
        let category = categories.map((value: CategoryId) => {
            return value.id;
        });

        const response1 = await request(app).put("/category").set('authentication', token).send({
            id: category[0],
            name: "Teste2"
        });

        expect(response1.status).toBe(200);
    });

    it("Should be able to delete a category exist", async () => {
        const response = await request(app).get("/category");

        let categories = response.body;
        let category = categories.map(value => {
            return value.id;
        });

        const response1 = await request(app).delete("/category").set("authentication", token).send({
            id: category[0]
        });

        expect(response1.status).toBe(200);
    })
});