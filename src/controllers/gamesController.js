import connection from "../dbStrategy/database.js";

export async function insertGame(req, res) {

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {

        const insertQuery = `
            INSERT INTO 
                games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES 
                ($1, $2, $3, $4, $5);
        `;

        await connection.query(
            insertQuery, 
            [
                name, 
                image, 
                stockTotal, 
                categoryId, 
                pricePerDay
            ]);

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getGames(req, res) {

    const { name } = req.query;

    let query = `
        SELECT categories.name as categoryName, games.* FROM games 
        JOIN categories ON categories.id = games."categoryId"
    `;

    try {
        if(name) {
            query = `${query} WHERE lower(games.name) LIKE $1`;
            const { rows: games } = await connection.query(query, [name + '%']);
            res.status(200).send(games);
        } else {
            const { rows: games } = await connection.query(query);
            res.status(200).send(games);
        }

    } catch (error) {
        res.sendStatus(500);
    }
}
