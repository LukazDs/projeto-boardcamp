import { Router } from 'express';
import { getCustomerById, getCustomers, insertCustomer, updateCustomer } from '../controllers/customersController.js';
import { validateCustomer, validateCustomerById, validateUpdateCustomerById } from '../middlewares/validateCustomers.js';

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', validateCustomerById, getCustomerById);
router.post('/customers', validateCustomer, insertCustomer);
router.put('/customers/:id', validateCustomerById, validateUpdateCustomerById, updateCustomer);

export default router;