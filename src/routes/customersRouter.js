import { Router } from 'express';
import { getCustomerById, getCustomers, insertCustomer } from '../controllers/customersController.js';
import { validateCustomer, validateCustomerById } from '../middlewares/validateCustomers.js';

const router = Router();

router.get('/customers', getCustomers)
router.get('/customers/:id', validateCustomerById, getCustomerById)
router.post('/customers', validateCustomer, insertCustomer)

export default router;