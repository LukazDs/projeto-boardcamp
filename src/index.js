import express from "express";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categoriesRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(categoriesRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Conexão estabelecida! PORTA ${PORT}`));
