import { Router } from 'express';
import { insertRental, getRentals, deleteRental } from '../controllers/rentalsController.js';
import { validateCustomerById } from '../middlewares/validateCustomers.js';
import { validateGameById } from '../middlewares/validateGames.js';
import { validateRental, validateRentalDelete } from '../middlewares/validateRentals.js';

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', validateCustomerById, validateGameById, validateRental, insertRental);
router.delete('/rentals/:id', validateRentalDelete, deleteRental);

export default router;