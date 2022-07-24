import { Router } from 'express';
import { getCategories, insertCategories } from 
'../controllers/categoriesController.js';
import validateCategory from '../middlewares/validateCategories.js';

const router = Router();

router.get('/categories', getCategories)
router.post('/categories', validateCategory, insertCategories)

export default router;