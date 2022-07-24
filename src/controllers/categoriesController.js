import connection from "../dbStrategy/database.js";
import { categorySchema } from "../schemas/categoriesSchemas.js";

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

    const query = `
        INSERT INTO categories (name)
        VALUES ($1);
        `;
    
    const validation = categorySchema.validate(req.body)

    if(validation.error) {
        res.sendStatus(422);
    }
    
    try {
        await connection.query(query, [name]);
        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}
