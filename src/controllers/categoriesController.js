import connection from "../dbStrategy/database.js";

export async function getCategories(_req, res) {

    try {

        const query = 'SELECT * FROM categories';
        const { rows: categories } = await connection.query(query);
        
        res.status(200).send(categories);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function insertCategory(req, res) {

    try {

        const { name } = req.body;

        const query = `INSERT INTO categories (name) VALUES ($1)`;
        await connection.query(query, [name]);

        res.sendStatus(201)

    } catch (error) {

        res.sendStatus(500);

    }
}
