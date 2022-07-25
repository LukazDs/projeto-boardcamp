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

export async function deleteRental(req, res) {

    try {

        const { id } = req.params;

        const rentalQuery = `DELETE FROM rentals WHERE id = $1`;
        await connection.query(rentalQuery, [id]);

        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getRentals(req, res) {

    try {

        const { customerId, gameId } = req.query;

        let rentalQuery = `
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

        const { rows: rentals } = await connection.query(rentalQuery);

        if (customerId) {

            rentalQuery = `${rentalQuery} WHERE rentals."customerId" = $1`

            const { rows: rentals } = await connection.query(rentalQuery, [customerId]);
            res.send(rentals);
            return;
        }

        if (gameId) {

            rentalQuery = `${rentalQuery} WHERE rentals."gameId" = $1`

            const { rows: rentals } = await connection.query(rentalQuery, [gameId]);
            res.send(rentals);
            return;
        }

        res.send(rentals);

    } catch (error) {
        res.sendStatus(500);
    }
}