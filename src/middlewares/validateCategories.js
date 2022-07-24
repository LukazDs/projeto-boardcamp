import connection from "../dbStrategy/database.js";
import { categorySchema } from "../schemas/categoriesSchemas.js";

async function validateCategory(req, res, next) {

    const { name } = req.body;

    const validation = categorySchema.validate(req.body)

    if(validation.error) {
        res.sendStatus(422);
        return;
    }

    const query = 'SELECT * FROM categories WHERE name = $1';
    const { rows: categoryName } = await connection.query(query, [name]);

    if (categoryName.length !== 0) {
        res.sendStatus(409);
        return;
    }

    next();
}

export default validateCategory;
