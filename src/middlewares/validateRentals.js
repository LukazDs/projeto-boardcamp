import connection from "../dbStrategy/database.js";

async function validateRental(req, res, next) {

    const { daysRented, gameId } = req.body;

    let query = '';

    if (daysRented < 0) {

        res.sendStatus(400);
        return;

    }

    query = `SELECT * FROM games WHERE id = $1`;
    const { rows: game } = await connection.query(query, [gameId]);
    const { stockTotal } = game[0];

    query = `SELECT * FROM rentals WHERE "gameId" = $1`;
    const { rows: rentals } = await connection.query(query, [gameId]);

    if (rentals.length >= stockTotal) {

        res.sendStatus(400);
        return;

    }

    next();
}

async function validateRentalDelete(req, res, next) {

    const { id } = req.params;

    const query = `SELECT * FROM rentals WHERE id = $1`;
    const { rows: rental } = await connection.query(query, [id]);


    if (rental.length === 0) {

        res.sendStatus(404);
        return;

    }

    if (!rental[0].returnDate) {

        res.sendStatus(400);
        return;

    }

    next();

}

async function validateRentalById(req, res, next) {

    const { id } = req.params;

    const query = `SELECT * FROM rentals WHERE id = $1`;
    const { rows: rental } = await connection.query(query, [id]);


    if (rental.length === 0) {

        res.sendStatus(404);
        return;

    }

    if (rental[0].returnDate) {

        res.sendStatus(400);
        return;

    }

    next();

}

export { validateRental, validateRentalDelete, validateRentalById };
