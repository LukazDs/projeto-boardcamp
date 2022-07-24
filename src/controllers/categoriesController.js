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
