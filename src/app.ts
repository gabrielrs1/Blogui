import "reflect-metadata";
import express, { Request, Response } from "express";
import { router } from "./router";
import "./database";

const app = express();

app.use(express.json())
app.use(router);

app.get("/", (request: Request, response: Response) => {
    return response.send("Ok");
})

export { app };