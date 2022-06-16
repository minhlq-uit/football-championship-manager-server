import express from 'express';
import {getAllPlayers, getPlayerById, createNewPlayer, updatePlayer, deletePlayer, getPlayerByClubId} from '../controllers/Player.js';

const router = express.Router();

router.get('/', getAllPlayers);
router.get('/details/:playerId', getPlayerById);
router.get('/:clubId', getPlayerByClubId);
router.post('/', createNewPlayer);
router.put('/playerId=:playerId', updatePlayer);
router.delete('/playerId=:playerId', deletePlayer);

export default router;