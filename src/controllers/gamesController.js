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
        
        await connection.query(insertQuery, [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(500);
    }
}
