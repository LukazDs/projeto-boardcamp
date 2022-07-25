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