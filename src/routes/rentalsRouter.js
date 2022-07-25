import { Router } from 'express';
import { insertRental } from '../controllers/rentalsController.js';
import { validateCustomerById } from '../middlewares/validateCustomers.js';
import { validateGameById } from '../middlewares/validateGames.js';
import { validateRental } from '../middlewares/validateRentals.js';

const router = Router();

//router.get('/games', getGames);
router.post('/rentals', validateCustomerById, validateGameById, validateRental, insertRental);

export default router;