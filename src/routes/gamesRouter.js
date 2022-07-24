import { Router } from 'express';
import { getGames, insertGame } from '../controllers/gamesController.js';
import validateGame from '../middlewares/validateGames.js';

const router = Router();

router.get('/games', getGames)
router.post('/games', validateGame, insertGame)

export default router;