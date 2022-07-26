import connection from "../dbStrategy/database.js";
import { gameSchema } from "../schemas/gamesSchemas.js";

async function validateGame(req, res, next) {

    const { categoryId, name } = req.body;

    const validation = gameSchema.validate(req.body);

    let query = '';

    query = 'SELECT * FROM categories WHERE id = $1';
    const { rows: category } = await connection.query(query, [categoryId]);

    query = 'SELECT * FROM games WHERE name = $1';
    const { rows: game } = await connection.query(query, [name]);

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    if (category.length === 0) {

        res.sendStatus(400);
        return;

    }

    if (game.length !== 0) {
        
        res.sendStatus(409);
        return;
        
    }

    next();

}

async function validateGameById(req, res, next) {

    const { gameId } = req.body;

    const query = 'SELECT * FROM games WHERE id = $1';
    const { rows: game } = await connection.query(query, [gameId]);

    if (game.length === 0) {

        res.sendStatus(400);
        return;

    }

    next();

}

export { validateGame, validateGameById };
