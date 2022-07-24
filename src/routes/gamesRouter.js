import { Router } from 'express';
import { insertGame } from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGames.js';

const router = Router();

//router.get('/categories', getCategories)
router.post('/games', validateGame, insertGame)

export default router;