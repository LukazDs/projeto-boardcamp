import connection from "../dbStrategy/database.js";

export async function insertCustomer(req, res) {

    try {

        const { name, phone, cpf, birthday } = req.body;

        const insertQuery = `
            INSERT INTO 
                customers (name, phone, cpf, birthday)
            VALUES 
                ($1, $2, $3, $4);
        `;

        await connection.query(
            insertQuery,
            [
                name,
                phone,
                cpf,
                birthday,
            ]);

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getCustomers(req, res) {

    try {
        const { cpf } = req.query;

        let query = `SELECT * FROM customers`;

        if (cpf) {
            query = `${query} WHERE cpf LIKE $1`;
            const { rows: customers } = await connection.query(query, [cpf + '%']);
            res.status(200).send(customers);
        } else {
            const { rows: customers } = await connection.query(query);
            res.status(200).send(customers);
        }

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getCustomerById(_req, res) {

    try {

        const { customer } = res.locals
        res.status(200).send(customer);

    } catch (error) {
        res.sendStatus(500);
    }
}
