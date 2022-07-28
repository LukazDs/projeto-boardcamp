import connection from "../dbStrategy/database.js";

export async function insertCustomer(req, res) {

    try {

        const { name, phone, cpf, birthday } = req.body;

        const query = `
            INSERT INTO  customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)
        `;

        await connection.query(query, [name, phone, cpf, birthday]);

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

        const { customer } = res.locals;

        res.status(200).send(customer);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function updateCustomer(req, res) {

    try {

        const { id } = req.params;
        const { name, phone, cpf, birthday } = req.body;

        const query = `
                UPDATE customers 
                SET name = $1, phone = $2, cpf = $3, birthday = $4  
                WHERE id = $5
            `;

        await connection.query(query, [name, phone, cpf, birthday, id]);

        res.sendStatus(200);

    } catch (error) {

        res.sendStatus(500);

    }
}
