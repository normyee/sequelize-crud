import express from "express";
import { db } from "./config/db";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(3335, async () => {
    try {
        await db.sync();
        console.log("Server is running on 3335!");
    } catch(e) {
        console.log("Error occurred", e);
    }
});