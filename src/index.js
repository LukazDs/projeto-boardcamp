import express from "express";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import customersRouter from "./routes/customersRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Conexão estabelecida! PORTA ${PORT}`));
