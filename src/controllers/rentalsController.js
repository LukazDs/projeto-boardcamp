import dayjs from "dayjs";
import connection from "../dbStrategy/database.js";

export async function insertRental(req, res) {

    try {

        const { customerId, gameId, daysRented } = req.body;

        const rentDate = dayjs().format("YYYY-MM-DD");

        const gameQuery = `SELECT * FROM games WHERE id = $1`;
        const { rows: games } = await connection.query(gameQuery, [gameId]);

        const { pricePerDay } = games[0];

        const originalPrice = pricePerDay * daysRented;

        const returnDate = null;
        const delayFee = null;

        const insertQuery = `
            INSERT INTO 
                rentals (
                    "customerId", 
                    "gameId", 
                    "rentDate", 
                    "daysRented", 
                    "returnDate", 
                    "originalPrice", 
                    "delayFee")
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7);
            `;

        await connection.query(
            insertQuery,
            [
                customerId,
                gameId,
                rentDate,
                daysRented,
                returnDate,
                originalPrice,
                delayFee
            ]);

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function finalizeRental(req, res) {

    try {

        const { id } = req.params;

        let query = `SELECT * FROM rentals WHERE id = $1`;

        const { rows: rentals } = await connection.query(query, [id]);
        const { rentDate, daysRented, gameId } = rentals[0];

        const deliveryDate = dayjs(rentDate).add(daysRented, 'day').format('YYYY-MM-DD');
        const returnDate = dayjs().format('YYYY-MM-DD');
        const diffDate = dayjs(returnDate).diff(deliveryDate, 'day');

        query = `SELECT * FROM games WHERE games.id = $1`
        const { rows: game } = await connection.query(query, [gameId]);
        const { pricePerDay } = game[0];

        query = `UPDATE rentals SET "returnDate" = $1`;
        const params = [returnDate, id];

        if (diffDate > 0) {

            query += `, "delayFee" = $3`;
            params.push(diffDate * pricePerDay);
        
        } else {

            query += `, "delayFee" = $3`;
            params.push(0);

        }

        query += `WHERE id = $2`;
        await connection.query(query, params);

        res.sendStatus(201);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function deleteRental(req, res) {

    try {

        const { id } = req.params;

        const query = `DELETE FROM rentals WHERE id = $1`;
        await connection.query(query, [id]);

        res.sendStatus(200);

    } catch (error) {

        res.sendStatus(500);

    }
}

export async function getRentals(req, res) {

    try {

        const { customerId, gameId } = req.query;

        let query = `
            SELECT rentals.*, row_to_json(customers) 
            AS customer, row_to_json(games) 
            AS game FROM rentals 
            JOIN (SELECT id, name FROM customers) customers 
            ON customers.id = rentals."customerId" 
            JOIN (SELECT id, name, "categoryId" FROM games) games 
            ON games.id = rentals."gameId" 
            JOIN categories 
            ON categories.id = games."categoryId"
        `;

        const { rows: rentals } = await connection.query(query);

        if (customerId) {

            query = `${query} WHERE rentals."customerId" = $1`
            const { rows: rentals } = await connection.query(query, [customerId]);

            res.send(rentals);
            return;

        }

        if (gameId) {

            query = `${rentalQuery} WHERE rentals."gameId" = $1`
            const { rows: rentals } = await connection.query(query, [gameId]);

            res.send(rentals);
            return;

        }

        res.send(rentals);

    } catch (error) {

        res.sendStatus(500);

    }
}
