import connection from "../dbStrategy/database.js";

export async function insertCustomer(req, res) {

    const { name, phone, cpf, birthday } = req.body;

    try {

        const insertQuery = `
            INSERT INTO 
                customers (name, phone, cpf, birthday)
            VALUES 
                ($1, $2, $3, $4);
        `;

        await connection.query(insertQuery, [name, phone, cpf, birthday]);

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}