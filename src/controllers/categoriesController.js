import connection from "../dbStrategy/database.js";

export async function getCategories(_req, res) {

    const query = 'SELECT * FROM categories';
    
    try {
        const { rows: categories } = await connection.query(query);
        res.status(200).send(categories);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function insertCategories(req, res) {

    const {name} = req.body;
    
    try {

        const insertQuery = `
        INSERT INTO categories (name)
        VALUES ($1);
        `;

        await connection.query(insertQuery, [name]);
        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}
