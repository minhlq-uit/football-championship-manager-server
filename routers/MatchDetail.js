import express from 'express';
import {getAllMatchDetails, createNewMatchDetail, getMatchDetailById, updateMatchDetail,deleteMatchDetail} from '../controllers/MatchDetail.js';

const router = express.Router();

router.get('/', getAllMatchDetails);
router.get('/matchDetailId=:matchDetailId', getMatchDetailById);
router.post('/create', createNewMatchDetail);
router.put('/update/matchDetailId=:matchDetailId', updateMatchDetail);
router.delete('/delete/matchDetailId=:MatchDetailId', deleteMatchDetail);

export default router;