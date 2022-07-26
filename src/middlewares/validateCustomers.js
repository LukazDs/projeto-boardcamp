import dayjs from "dayjs";
import connection from "../dbStrategy/database.js";
import { customerSchema } from "../schemas/customersSchemas.js";

async function validateCustomer(req, res, next) {

    const { birthday, cpf } = req.body;

    const validation = customerSchema.validate(req.body);

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    const cpfQuery = 'SELECT * FROM customers WHERE cpf = $1';
    const { rows: customer } = await connection.query(cpfQuery, [cpf]);

    if (customer.length !== 0) {

        res.sendStatus(409);
        return;

    }

    if (!dayjs(birthday).isValid()) {

        res.sendStatus(400);
        return;

    }

    next();

}

async function validateCustomerById(req, res, next) {

    const id = req.params.id ? req.params.id : req.body.customerId;

    const query = `SELECT * FROM customers WHERE id = $1`;
    const { rows: customer } = await connection.query(query, [id]);

    if (customer.length === 0) {

        res.sendStatus(404);
        return;

    }

    res.locals.customer = customer;

    next();

}

async function validateUpdateCustomerById(req, res, next) {

    const { id } = req.params;
    const { cpf, birthday } = req.body;

    const validation = customerSchema.validate(req.body);

    if (validation.error) {

        res.sendStatus(422);
        return;

    }

    const cpfQuery = 'SELECT * FROM customers WHERE cpf = $1 AND id <> $2';
    const { rows: customer } = await connection.query(cpfQuery, [cpf, id]);

    if (customer.length !== 0) {

        res.sendStatus(409);
        return;

    }

    if (!dayjs(birthday).isValid()) {

        res.sendStatus(400);
        return;

    }

    next();

}

export { validateCustomer, validateCustomerById, validateUpdateCustomerById };
