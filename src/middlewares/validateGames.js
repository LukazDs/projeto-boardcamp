import connection from "../dbStrategy/database.js";
import { gameSchema } from "../schemas/gamesSchemas.js";

async function validateGame(req, res, next) {

    const { categoryId, name } = req.body;

    const validation = gameSchema.validate(req.body)

    if (validation.error) {
        res.sendStatus(422);
        return;
    }

    const idQuery = 'SELECT * FROM categories WHERE id = $1';
    const { rows: category } = await connection.query(idQuery, [categoryId]);

    if (category.length === 0) {
        res.sendStatus(400);
        return;
    }

    const nameQuery = 'SELECT * FROM games WHERE name = $1'
    const { rows: game } = await connection.query(nameQuery, [name]);

    if (game.length !== 0) {
        res.sendStatus(409);
        return;
    }

    next();

}

export default validateGame;
