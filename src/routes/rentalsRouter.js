import { Router } from 'express';
import { insertRental, getRentals } from '../controllers/rentalsController.js';
import { validateCustomerById } from '../middlewares/validateCustomers.js';
import { validateGameById } from '../middlewares/validateGames.js';
import { validateRental } from '../middlewares/validateRentals.js';

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', validateCustomerById, validateGameById, validateRental, insertRental);

export default router;