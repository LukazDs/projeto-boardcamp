import { Router } from 'express';
import { getCategories, insertCategories } from 
'../controllers/categoriesController.js';
//import validateChoice from '../middlewares/validateChoice.js';

const router = Router();

router.get('/categories', getCategories)
router.post('/categories', insertCategories)

export default router;