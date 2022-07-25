import connection from "../dbStrategy/database.js";

async function validateRental(req, res, next) {

    const { daysRented, gameId } = req.body;

    const gameQuery = `SELECT * FROM games WHERE id = $1`;
    const { rows: game } = await connection.query(gameQuery, [gameId]);
    const { stockTotal } = game[0];

    const rentalQuery = `SELECT * FROM rentals WHERE "gameId" = $1`;
    const { rows: rentals } = await connection.query(rentalQuery, [gameId]);

    if (daysRented < 0) {
        res.sendStatus(400);
        return;
    }
    
    if(rentals.length >= stockTotal) {
        res.sendStatus(400);
        return;
    }

    next();

}

export { validateRental };