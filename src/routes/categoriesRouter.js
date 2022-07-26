import { Router } from 'express';
import { getCategories, insertCategory } from 
'../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategories.js';

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', validateCategory, insertCategory);

export default router;
