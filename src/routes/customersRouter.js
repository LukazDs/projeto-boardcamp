import { Router } from 'express';
import { insertCustomer } from '../controllers/customersController.js';
import validateCustomer from '../middlewares/validateCustomers.js';
///import validateGame from '../middlewares/validateGames.js';

const router = Router();

///router.get('/games', getGames)
router.post('/customers', validateCustomer, insertCustomer)

export default router;