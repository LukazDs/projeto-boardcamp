import express from "express";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";
import gamesRouter from "./routes/gamesRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Conexão estabelecida! PORTA ${PORT}`));
