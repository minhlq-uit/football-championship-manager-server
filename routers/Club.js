import express from 'express';
import { getAllClub, getClubById, createNewClub, updateClub, deleteClub } from '../controllers/Club.js';

const router = express.Router();

router.get('/', getAllClub);
router.get('/:clubId', getClubById);
router.post('/', createNewClub);
router.put('/clubId=:clubId', updateClub);
router.delete('/clubId=:clubId', deleteClub);

export default router;