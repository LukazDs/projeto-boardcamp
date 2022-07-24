import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController.js';
//import validateChoice from '../middlewares/validateChoice.js';

const router = Router();

router.get('/categories', getCategories)

export default router;