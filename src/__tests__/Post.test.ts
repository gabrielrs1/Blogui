import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";

import createConnection from "../database";

let token = '';

interface PostId {
    id: string;
}

function getById(response) {
    let values = response;

    let value = values.map((v: PostId) => v.id);

    return value[0];
}

describe("Post", () => {
    beforeAll(async() => {
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

    it("Should not be able to create a new post with exist title", async () => {
        await request(app).post("/category").set('authentication', token).send({
            name: "Teste"
        });

        const response1 = await request(app).get("/category");

        const post = getById(response1.body);

        const response2 = await request(app).post("/post").set("authentication", token).send({
            title: "teste",
            description: "dwadawdawdawdawdawdawd",
            category_id: post
        });

        expect(response2.status).toBe(201);
    });

    it("Should be able to show all posts exists", async () => {
        const response = await request(app).get("/post");

        expect(response.status).toBe(200);
    });

    it("Should be able to update a post exist", async () => {
        const response1 = await request(app).get("/post");
        const response2 = await request(app).get("/category");

        const post = getById(response1.body);
        const category = getById(response2.body);

        const response3 = await request(app).put("/post").set("authentication", token).send({
            id: post,
            title: "Testeste",
            description: "awdwad253adwa",
            category_id: category
        });

        expect(response3.status).toBe(200);
    });

    it("Should be able to delete a post exist", async () => {
        const response1 = await request(app).get("/post");

        const post = getById(response1.body)

        const response2 = await request(app).delete("/post").set("authentication", token).send({
            id: post,
        });

        expect(response2.status).toBe(200);
    });
});